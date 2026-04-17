/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, triggerRef } from 'vue';
import type { CreateEmployeeInput, Employee, UpdateEmployeeInput } from '@/API';
import { employeesByFavourite, listEmployees } from '@/graphql/queries.ts';
import { updateEmployee, deleteEmployee, createEmployee } from '@/graphql/mutations';
import { onCreateEmployee, onUpdateEmployee, onDeleteEmployee } from '@/graphql/subscriptions';
import { API, graphqlOperation } from 'aws-amplify';
import type { TokensMap, TTokenType } from '@/types/TPosition.ts';
import type { IEmployee, IVariables } from '@/types/TEmployee';
import { useNotify } from '@/composables/useNotify.ts';

export function useEmployee() {
  const employees = ref<Employee[]>([]);
  const queryLimit = 5;
  const tokenList = ref<TokensMap | null>(null);
  const currentPage = ref(1);
  const useFilter = ref(false);
  const searchTerm = ref('');
  // const canUseLambdaSearch = ref(!(typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname)));
  const canUseLambdaSearch = ref(true);

  const { show } = useNotify();

  function resolveTokenType(): TTokenType {
    if (searchTerm.value.trim().length > 0) {
      return 'search';
    }

    return useFilter.value ? 'isFavourite' : 'global';
  }

  async function getEmployeesByGraphQLNameSearch(token: string | null): Promise<IEmployee | null> {
    const response = (await API.graphql({
      query: listEmployees,
      variables: {
        limit: queryLimit,
        nextToken: token,
        filter: {
          name: { contains: searchTerm.value.trim() }
        }
      }
    })) as any;

    const data = response.data.listEmployees;
    const items = data.items || [];

    return {
      items,
      nextToken: data.nextToken ?? null
    };
  }

  async function getEmployeesBySearch(token: string | null): Promise<IEmployee | null> {
    if (!canUseLambdaSearch.value) {
      return getEmployeesByGraphQLNameSearch(token);
    }

    const queryStringParameters: Record<string, string> = {
      term: searchTerm.value.trim(),
      limit: String(queryLimit)
    };

    if (token) {
      queryStringParameters.nextKey = token;
    }

    try {
      const response = (await API.get('SearchFunction', '/search', {
        queryStringParameters
      })) as any;

      console.log(response, 'response');

      return {
        items: (response?.items || []).filter((item: Employee): item is Employee => !!item),
        nextToken: response?.nextKey ?? null
      };
    } catch (error) {
      // Disable Lambda search after first failure to avoid repeated browser network/CORS errors.
      canUseLambdaSearch.value = false;
      return getEmployeesByGraphQLNameSearch(token);
    }
  }

  async function getEmployees(token: string | null): Promise<IEmployee | null> {
    if (searchTerm.value.trim().length > 0) {
      return getEmployeesBySearch(token);
    }

    const variables: IVariables = {
      limit: queryLimit,
      nextToken: token
    };

    const query = useFilter.value ? employeesByFavourite : listEmployees;

    if (useFilter.value) {
      variables.isFavourite = 'true';
    }
    const response = (await API.graphql({
      query: query,
      variables: variables
    })) as any;

    const data = useFilter.value ? response.data.employeesByFavourite : response.data.listEmployees;
    const items = data.items || [];

    return {
      items,
      nextToken: data.nextToken ?? null
    };
  }

  function setEmployee(items: Employee[]) {
    employees.value = items.filter((item: Employee): item is Employee => !!item);
  }

  function getPageToken(page: number): string | null {
    if (page === 1) return null;

    const tokenType = resolveTokenType();

    if (tokenList.value !== null && tokenList.value?.[tokenType]) {
      const currentTokenType = tokenList.value?.[tokenType];
      const tokenEntry = currentTokenType?.find((elem) => elem.page === page);
      return tokenEntry?.nextToken ?? null;
    }
    return null;
  }

  function hasTokenForPage(page: number): boolean {
    if (page === 1) return true;
    const tokenType = resolveTokenType();
    if (!tokenList.value || !tokenList.value[tokenType]) return false;

    const tokenEntry = tokenList.value[tokenType]?.find((elem) => elem.page === page);
    return tokenEntry !== undefined && tokenEntry.nextToken !== null;
  }

  async function nextPageEmployees() {
    const nextPage = currentPage.value + 1;

    if (!hasTokenForPage(nextPage)) return;

    const pageToken = getPageToken(nextPage);
    const res = await getEmployees(pageToken);

    if (res !== null) {
      const { items, nextToken } = res;
      setEmployee(items);
      setCurrentPage(nextPage);

      if (nextToken) {
        await verifyAndSetNextToken(nextToken, nextPage + 1);
      }
    }
  }

  async function prevPageEmployees() {
    if (currentPage.value <= 1) return;

    const prevPage = currentPage.value - 1;
    const pageToken = getPageToken(prevPage);
    const res = await getEmployees(pageToken);

    if (res !== null) {
      const { items } = res;
      setEmployee(items);
      setCurrentPage(prevPage);
    }
  }

  function setTokenToList(token: string | null, page: number) {
    const tokenType = resolveTokenType();

    if (!tokenList.value) {
      tokenList.value = {};
    }

    const tokenTypeList = tokenList.value[tokenType];

    if (!tokenTypeList) {
      tokenList.value[tokenType] = [];
      tokenList.value[tokenType]!.push({
        nextToken: token,
        page
      });
    } else {
      const pageIndex = tokenTypeList.findIndex((elem) => elem.page === page);

      if (pageIndex !== -1 && tokenTypeList[pageIndex] !== undefined) {
        tokenTypeList[pageIndex].nextToken = token;
      } else {
        tokenList.value[tokenType]!.push({
          nextToken: token,
          page
        });
      }
    }

    triggerRef(tokenList);
  }

  function removeTokenToList(page: number): boolean {
    const tokenType = resolveTokenType();

    if (!tokenList.value) return false;
    const tokenTypeList = tokenList.value[tokenType];

    if (!tokenTypeList) return false;

    const pageIndex = tokenTypeList.findIndex((elem) => elem.page === page);

    if (pageIndex !== -1) {
      tokenTypeList.splice(pageIndex, 1);
      triggerRef(tokenList);
      return true;
    }
    return false;
  }

  function invalidateTokensFrom(page: number) {
    const tokenType = resolveTokenType();

    if (!tokenList.value) return;
    const tokenTypeList = tokenList.value[tokenType];
    if (!tokenTypeList) return;

    tokenList.value[tokenType] = tokenTypeList.filter((elem) => elem.page <= page);

    triggerRef(tokenList);
  }


  async function updateEmployeeAction(input: UpdateEmployeeInput) {
    try {
      await API.graphql(graphqlOperation(updateEmployee, { input }));
      show('T_UPDATE');
    } catch (error) {
      console.error('Error updated employee:', error);
      show('T_ERROR');
    }
  }

  async function deleteEmployeeAction(id: string) {
    try {
      const res = await API.graphql(graphqlOperation(deleteEmployee, { input: { id } }));
      console.log(res, 'delete');
      show('T_DELETE');
    } catch (error) {
      console.error('Error updated employee:', error);
      show('T_ERROR');
    }
  }

  async function createEmployeeAction(input: CreateEmployeeInput) {
    try {
      await API.graphql(graphqlOperation(createEmployee, { input }));
      show('T_CREATE');
    } catch (error) {
      console.error('Error creating employee:', error);
      show('T_ERROR');
    }
  }

  function subscribeToEmployees(onData: (data: any, type: 'CREATE' | 'UPDATE' | 'DELETE') => void) {
    const createSub = (API.graphql({ query: onCreateEmployee }) as any).subscribe({
      next: ({ value }: any) => onData(value.data.onCreateEmployee, 'CREATE')
    });
    const updateSub = (API.graphql({ query: onUpdateEmployee }) as any).subscribe({
      next: ({ value }: any) => onData(value.data.onUpdateEmployee, 'UPDATE')
    });
    const deleteSub = (API.graphql({ query: onDeleteEmployee }) as any).subscribe({
      next: ({ value }: any) => onData(value.data.onDeleteEmployee, 'DELETE')
    });

    return () => {
      createSub.unsubscribe();
      updateSub.unsubscribe();
      deleteSub.unsubscribe();
    };
  }

  function setCurrentPage(value: number) {
    currentPage.value = value;
  }

  async function verifyAndSetNextToken(nextToken: string | null, forPage: number): Promise<boolean> {
    if (!nextToken) return false;

    const res = await getEmployees(nextToken);

    if (res !== null && res.items.length > 0) {
      setTokenToList(nextToken, forPage);
      return true;
    }

    return false;
  }

  function toggleShowUseFilter() {
    useFilter.value = !useFilter.value;
  }

  function clearTokenList() {
    tokenList.value = null;
    currentPage.value = 1;
  }

  function setSearchTerm(value: string) {
    searchTerm.value = value.trim();
  }

  return {
    employees,
    tokenList,
    currentPage,
    useFilter,
    searchTerm,
    getEmployees,
    updateEmployeeAction,
    deleteEmployeeAction,
    createEmployeeAction,
    subscribeToEmployees,
    prevPageEmployees,
    nextPageEmployees,
    getPageToken,
    setCurrentPage,
    setEmployee,
    removeTokenToList,
    invalidateTokensFrom,
    hasTokenForPage,
    verifyAndSetNextToken,
    toggleShowUseFilter,
    clearTokenList,
    setSearchTerm
  };
}
