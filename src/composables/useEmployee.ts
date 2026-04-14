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

  async function getEmployees(token: string | null): Promise<string> {
    const response = (await API.graphql({
      query: listEmployees,
      variables: { limit: queryLimit, nextToken: token }
    })) as any;

    const items = response.data.listEmployees.items || [];
    employees.value = items.filter((item: Employee): item is Employee => !!item);
    return response.data.listEmployees.nextToken || '';
  }

  function getCurrentPageToken(page: number): string | null {
    if (tokenList.value !== null && tokenList.value?.[tokenType.value]) {
      const currentTokenType = tokenList.value?.[tokenType.value];
      const nextToken = currentTokenType ? currentTokenType.find(
        (elem) => elem.page === page
      )?.nextToken : null;
      return nextToken ? nextToken : null;
    }

    return null;
  }

  async function nextPageEmployees(tokenType: TTokenType) {
    if (tokenList.value !== null) {
      const nextToken = getCurrentPageToken(currentPage.value + 1);

      const token = await getEmployees(nextToken);
      setCurrentPage(currentPage.value + 1);
      setTokenToList(tokenType, token, currentPage.value + 1);
    }
  }

  async function prevPageEmployees(tokenType: TTokenType) {
    if (tokenList.value !== null) {
      const nextToken = getCurrentPageToken(currentPage.value + 1);

      const token = await getEmployees(nextToken);
      setCurrentPage(currentPage.value - 1);
      setTokenToList(tokenType, token, currentPage.value - 1);
    }
  }

  function setTokenToList(tokenType: TTokenType, token: string, page: number) {
    if (!tokenList.value) {
      tokenList.value = {};
    }

    if (!tokenList.value[tokenType]) {
      tokenList.value[tokenType] = [];
    }

    const pageIndex = tokenList.value[tokenType].findIndex((elem) => elem.page === page);

    if (
      pageIndex !== -1 &&
      tokenList.value[tokenType] !== undefined &&
      tokenList.value[tokenType][pageIndex] !== undefined
    ) {
      tokenList.value[tokenType][pageIndex].nextToken = token;
    } else {
      tokenList.value[tokenType]!.push({
        nextToken: token,
        page
      });
    }
  }

  async function getFavouritesEmployees(token?: string) {
    const response = (await API.graphql({
      query: employeesByFavourite,
      variables: { limit: queryLimit, isFavourite: 'true', nextToken: token }
    })) as any;

    console.log(response, 'response');
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

  watch(employees, (newEmployees) => {
    console.log('watch emp', newEmployees);
  });

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
    getCurrentPageToken,
    setCurrentPage
  };
}
