import { ref, onUnmounted, computed, watch, watchEffect } from 'vue';
import { defineStore } from 'pinia';
import { useEmployee } from '@/composables/useEmployee';
import type { Employee, CreateEmployeeInput, UpdateEmployeeInput } from '@/API';

export const useEmployeeStore = defineStore('EmployeeStore', () => {
  const {
    employees,
    currentPage,
    tokenList,
    getEmployees,
    updateFavoriteAction,
    deleteEmployeeAction,
    createEmployeeAction,
    getFavouritesEmployees,
    subscribeToEmployees,
    nextPageEmployees,
    prevPageEmployees,
    setTokenToList,
    getPageToken,
    setCurrentPage,
    setEmployee
  } = useEmployee();
  const isLoading = ref(false);
  const showFavourites = ref(false);
  let unsubscribe: (() => void) | null = null;

  const isNextActive = ref(true);
  const isPrevActive = ref(true);

  async function fetchEmployees(token: string | null = null) {
    isLoading.value = true;
    try {
      const res = await getEmployees(token);
      if (res !== null) {
        const { items, nextToken } = res;
        setEmployee(items);
        setTokenToList(nextToken, currentPage.value + 1);
      }

    } finally {
      isLoading.value = false;
    }
  }

  async function fetchNextEmployees() {
    isLoading.value = true;
    try {
      await nextPageEmployees();
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchPrevEmployees() {
    isLoading.value = true;
    try {
      await prevPageEmployees();
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchFavouritesEmployees(token?: string) {
    isLoading.value = true;
    try {
      await getFavouritesEmployees(token);
    } finally {
      isLoading.value = false;
    }
  }

  async function toggleFavouriteAction(data: Employee) {
    const input: UpdateEmployeeInput = {
      id: data.id,
      isFavourite: data.isFavourite === 'true' ? 'false' : 'true'
    };
    await updateFavoriteAction(input);
  }

  async function removeEmployee(id: string) {
    console.log('Removing employee with ID:', id);
    await deleteEmployeeAction(id);
  }

  async function addEmployeeAction(input: CreateEmployeeInput) {
    if (!input.isFavourite) input.isFavourite = 'false';
    await createEmployeeAction(input);
  }

  function initSubscriptions() {
    if (unsubscribe) return;

    unsubscribe = subscribeToEmployees(async (data, type) => {
      if (type === 'CREATE') {
        const currPageToken = getPageToken(currentPage.value);
        const res = await getEmployees(currPageToken);

        if (res !== null) {
          const { items, nextToken } = res;
          setEmployee(items);
          setTokenToList(nextToken, currentPage.value + 1);
          setTokenToList(nextToken, currentPage.value);
        }
        // setCurrentPage(currentPage.value);

      } else if (type === 'UPDATE') {
        const index = employees.value.findIndex((e) => e.id === data.id);
        if (index !== -1) employees.value[index] = { ...employees.value[index], ...data };
      } else if (type === 'DELETE') {
        const currPageToken = getPageToken(currentPage.value);
        const res = await getEmployees(currPageToken);

        if (res !== null) {
          const { items, nextToken } = res;
          const prevPageNextToken = getPageToken(currentPage.value - 1);
          const prevPageToken = await getEmployees(prevPageNextToken);

          console.log(tokenList.value, 'ssdfsf');

          if (prevPageToken === null && currentPage.value !== 1) {
            setCurrentPage(currentPage.value - 1);
            setTokenToList(prevPageToken, currentPage.value);
          }
        }

      }
    });
  }

  function stopSubscriptions() {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
  }

  function toggleFavourites() {
    showFavourites.value = !showFavourites.value;
  }

  watch(tokenList, (newTokenList) => {
    const nextPageNumber = currentPage.value + 1;
    const tokenNextPage = getPageToken(nextPageNumber);
    isNextActive.value = !!tokenNextPage;
    isPrevActive.value = currentPage.value > 1;
  }, {
    immediate: true
  });

  watch(currentPage, (newCurrentPage) => {
    const nextPageNumber = currentPage.value + 1;
    const tokenNextPage = getPageToken(nextPageNumber);
    isNextActive.value = !!tokenNextPage;
    isPrevActive.value = newCurrentPage > 1;
  }, {
    immediate: true
  });

  watch(tokenList, () => {
    console.log(tokenList.value, 'token list');
  }, {
    immediate: true
  });

  return {
    employees,
    isLoading,
    showFavourites,
    currentPage,
    isNextActive,
    isPrevActive,
    fetchEmployees,
    toggleFavouriteAction,
    removeEmployee,
    addEmployeeAction,
    initSubscriptions,
    stopSubscriptions,
    fetchNextEmployees,
    fetchPrevEmployees
  };
});
