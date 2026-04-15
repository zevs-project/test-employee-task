/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, triggerRef } from 'vue';
import type { CreateEmployeeInput, Employee, UpdateEmployeeInput } from '@/API';
import { employeesByFavourite, listEmployees } from '@/graphql/queries.ts';
import { updateEmployee, deleteEmployee, createEmployee } from '@/graphql/mutations';
import { onCreateEmployee, onUpdateEmployee, onDeleteEmployee } from '@/graphql/subscriptions';
import { API, graphqlOperation } from 'aws-amplify';
import type { TokensMap, TTokenType } from '@/types/TPosition.ts';
import type { IEmployee } from '@/types/TEmployee';

export function useEmployee() {
  const employees = ref<Employee[]>([]);
  const queryLimit = 3;
  const tokenList = ref<TokensMap | null>(null);
  const currentPage = ref(1);
  const tokenType = ref<TTokenType>('global');


  async function getEmployees(token: string | null): Promise<IEmployee | null> {
    const response = (await API.graphql({
      query: listEmployees,
      variables: { limit: queryLimit, nextToken: token }
    })) as any;

    const items = response.data.listEmployees.items || [];

    return {
      items,
      nextToken: response.data.listEmployees.nextToken ?? null
    };
  }

  // Завжди оновлюємо employees, навіть якщо items пустий
  function setEmployee(items: Employee[]) {
    employees.value = items.filter((item: Employee): item is Employee => !!item);
  }

  // Для сторінки 1 токен завжди null, для інших шукаємо в tokenList
  function getPageToken(page: number): string | null {
    if (page === 1) return null;

    if (tokenList.value !== null && tokenList.value?.[tokenType.value]) {
      const currentTokenType = tokenList.value?.[tokenType.value];
      const tokenEntry = currentTokenType?.find((elem) => elem.page === page);
      return tokenEntry?.nextToken ?? null;
    }
    return null;
  }

  // Перевіряємо чи є токен для конкретної сторінки (чи можна на неї перейти)
  function hasTokenForPage(page: number): boolean {
    if (page === 1) return true;
    if (!tokenList.value || !tokenList.value[tokenType.value]) return false;

    const tokenEntry = tokenList.value[tokenType.value]?.find((elem) => elem.page === page);
    return tokenEntry !== undefined && tokenEntry.nextToken !== null;
  }

  async function nextPageEmployees() {
    const nextPage = currentPage.value + 1;

    // Перевіряємо чи є токен для наступної сторінки
    if (!hasTokenForPage(nextPage)) return;

    const pageToken = getPageToken(nextPage);
    const res = await getEmployees(pageToken);

    if (res !== null) {
      const { items, nextToken } = res;
      setEmployee(items);
      setCurrentPage(nextPage);

      // Якщо є наступна сторінка — зберігаємо токен
      if (nextToken) {
        setTokenToList(nextToken, nextPage + 1);
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

      if (pageIndex !== -1 && tokenTypeList[pageIndex] !== undefined) {
        tokenTypeList[pageIndex].nextToken = token;
      } else {
        tokenList.value[tokenType.value]!.push({
          nextToken: token,
          page
        });
      }
    }

    // Примусово тригеримо реактивність для вкладених змін
    triggerRef(tokenList);
  }

  function removeTokenToList(page: number): boolean {
    if (!tokenList.value) return false;
    const tokenTypeList = tokenList.value[tokenType.value];

    if (!tokenTypeList) return false;

    const pageIndex = tokenTypeList.findIndex((elem) => elem.page === page);

    if (pageIndex !== -1) {
      tokenTypeList.splice(pageIndex, 1);
      triggerRef(tokenList);
      return true;
    }
    return false;
  }

  // Інвалідувати (видалити) всі токени для сторінок > page
  function invalidateTokensFrom(page: number) {
    if (!tokenList.value) return;
    const tokenTypeList = tokenList.value[tokenType.value];
    if (!tokenTypeList) return;

    // Видаляємо всі токени для сторінок більших за page
    tokenList.value[tokenType.value] = tokenTypeList.filter((elem) => elem.page <= page);

    triggerRef(tokenList);
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

  async function createEmployeeAction(input: CreateEmployeeInput) {
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
    createEmployeeAction,
    subscribeToEmployees,
    getFavouritesEmployees,
    prevPageEmployees,
    nextPageEmployees,
    setTokenToList,
    getPageToken,
    setCurrentPage,
    setEmployee,
    removeTokenToList,
    invalidateTokensFrom,
    hasTokenForPage
  };
}
