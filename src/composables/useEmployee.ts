import { type Ref, ref, watch } from 'vue';
import type { CreateEmployeeInput, Employee, UpdateEmployeeInput, DeleteEmployeeInput } from '@/API';
import { employeesByFavourite, listEmployees } from '@/graphql/queries.ts';
import { updateEmployee, deleteEmployee, createEmployee } from '@/graphql/mutations';
import { onCreateEmployee, onUpdateEmployee, onDeleteEmployee } from '@/graphql/subscriptions';
import { API, graphqlOperation } from 'aws-amplify';
import type { TokensMap, TTokenType } from '@/types/TPosition.ts';

export function useEmployee() {
  const employees = ref<Employee[]>([]);
  const queryLimit = 3;
  const tokenList = ref<TokensMap | null>(null);
  const currentPage = ref(1);
  const tokenType = ref<TTokenType>('global');

  async function getEmployees(token: string | null): Promise<string | null> {
    const response = (await API.graphql({
      query: listEmployees,
      variables: { limit: queryLimit, nextToken: token }
    })) as any;

    const items = response.data.listEmployees.items || [];
    if (items.length > 0) {
      employees.value = items.filter((item: Employee): item is Employee => !!item);
    }

    return response.data.listEmployees.nextToken ?? null;
  }

  function getPageToken(page: number): string | null {
    if (tokenList.value !== null && tokenList.value?.[tokenType.value]) {
      const currentTokenType = tokenList.value?.[tokenType.value];
      const nextToken = currentTokenType ? currentTokenType.find(
        (elem) => elem.page === page
      )?.nextToken : null;
      return nextToken ? nextToken : null;
    }
    return null;
  }

  async function nextPageEmployees() {
    if (tokenList.value !== null) {
      const page = currentPage.value + 1;
      const nextToken = getPageToken(page);
      const token = await getEmployees(nextToken);

      if (nextToken) {
        setCurrentPage(page);
        setTokenToList(token, page + 1);
      }

    }
  }

  async function prevPageEmployees() {
    if (tokenList.value !== null) {
      const page = currentPage.value - 1 <= 0 ? 1 : currentPage.value - 1;
      const nextToken = page > 1 ? getPageToken(page) : null;

      const token = await getEmployees(nextToken);
      setCurrentPage(page);
      // setTokenToList(token, page);
    }
  }

  function setTokenToList(token: string | null, page: number) {
    if (!tokenList.value) {
      tokenList.value = {};
    }

    const tokenTypeList = tokenList.value[tokenType.value];

    if (!tokenTypeList) {
      tokenList.value[tokenType.value] = [];
      tokenList.value[tokenType.value]!.push({
        nextToken: token,
        page
      });
    } else {
      const pageIndex = tokenTypeList.findIndex((elem) => elem.page === page);

      if (
        pageIndex !== -1 &&
        tokenTypeList[pageIndex] !== undefined
      ) {
        tokenTypeList[pageIndex].nextToken = token;
      } else {
        tokenList.value[tokenType.value]!.push({
          nextToken: token,
          page
        });
      }
    }
  }

  async function getFavouritesEmployees(token?: string) {
    const response = (await API.graphql({
      query: employeesByFavourite,
      variables: { limit: queryLimit, isFavourite: 'true', nextToken: token }
    })) as any;

    const items = response.data.listEmployees.items || [];
    employees.value = items.filter((item: Employee): item is Employee => !!item);
  }

  async function updateFavoriteAction(input: UpdateEmployeeInput) {
    try {
      await API.graphql(graphqlOperation(updateEmployee, { input }));
    } catch (error) {
      console.error('Error updated employee:', error);
    }
  }

  async function deleteEmployeeAction(id: string) {
    try {
      const res = await API.graphql(graphqlOperation(deleteEmployee, { input: { id } }));
      console.log(res, 'delete');
    } catch (error) {
      console.error('Error updated employee:', error);
    }
  }

  async function setEmployee(input: CreateEmployeeInput) {
    try {
      await API.graphql(graphqlOperation(createEmployee, { input }));
    } catch (error) {
      console.error('Error creating employee:', error);
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

  return {
    employees,
    tokenList,
    currentPage,
    getEmployees,
    updateFavoriteAction,
    deleteEmployeeAction,
    setEmployee,
    subscribeToEmployees,
    getFavouritesEmployees,
    prevPageEmployees,
    nextPageEmployees,
    setTokenToList,
    getPageToken,
    setCurrentPage
  };
}
