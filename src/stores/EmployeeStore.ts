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
    setEmployee,
    getFavouritesEmployees,
    subscribeToEmployees,
    nextPageEmployees,
    prevPageEmployees,
    setTokenToList,
    getPageToken,
    setCurrentPage
  } = useEmployee();
  const isLoading = ref(false);
  const showFavourites = ref(false);
  let unsubscribe: (() => void) | null = null;

  const isNextActive = ref(true);
  const isPrevActive = ref(true);

  async function fetchEmployees(token: string | null = null) {
    isLoading.value = true;
    try {
      const nextPageToken = await getEmployees(token);
      setTokenToList(nextPageToken || '', currentPage.value + 1);
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

  async function createEmployee(input: CreateEmployeeInput) {
    if (!input.isFavourite) input.isFavourite = 'false';
    await setEmployee(input);
  }

  function initSubscriptions() {
    if (unsubscribe) return;

    unsubscribe = subscribeToEmployees(async (data, type) => {
      if (type === 'CREATE' || type === 'DELETE') {
        const nextToken = getPageToken(currentPage.value);
        const token = await getEmployees(nextToken);
        setCurrentPage(currentPage.value + 1);
        setTokenToList(token, currentPage.value + 1);
        await fetchEmployees(nextToken);
      } else if (type === 'UPDATE') {
        const index = employees.value.findIndex((e) => e.id === data.id);
        if (index !== -1) employees.value[index] = { ...employees.value[index], ...data };
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

  /*watch(tokenList, (newTokenNextPage) => {
    console.log(tokenList.value, 'tokenList ');
    const nextPageNumber = currentPage.value + 1;
    const prevPageNumber = currentPage.value - 1;
    const tokenNextPage = getPageToken(nextPageNumber);
    const tokenPrevPage = getPageToken(prevPageNumber);
    isNextActive.value = !!tokenNextPage;
    // isPrevActive.value = currentPage.value <= 1;
  });*/

  watch(tokenList,  (newTokenList) => {
    const nextPageNumber = currentPage.value + 1;
    const prevPageNumber = currentPage.value - 1;
    const tokenNextPage = getPageToken(nextPageNumber);
    const tokenPrevPage = getPageToken(prevPageNumber);
    isNextActive.value = !!tokenNextPage;
    isPrevActive.value = currentPage.value > 1;

    console.log(isPrevActive.value, 'isPrevActive.value');
  }, {
    immediate: true,
  });

  watch(currentPage,  (newCurrentPage) => {
    const nextPageNumber = currentPage.value + 1;
    const prevPageNumber = currentPage.value - 1;
    const tokenNextPage = getPageToken(nextPageNumber);
    const tokenPrevPage = getPageToken(prevPageNumber);
    isNextActive.value = !!tokenNextPage;
    isPrevActive.value = newCurrentPage > 1;

    console.log(isPrevActive.value, 'isPrevActive.value');
  }, {
    immediate: true,
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
    createEmployee,
    initSubscriptions,
    stopSubscriptions,
    fetchNextEmployees,
    fetchPrevEmployees
  };
});
