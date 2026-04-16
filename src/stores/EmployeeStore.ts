import { ref, computed, watch } from 'vue';
import { defineStore } from 'pinia';
import { useEmployee } from '@/composables/useEmployee';
import type { Employee, CreateEmployeeInput, UpdateEmployeeInput } from '@/API';

export const useEmployeeStore = defineStore('EmployeeStore', () => {
  const {
    employees,
    currentPage,
    tokenList,
    useFilter,
    getEmployees,
    updateEmployeeAction,
    deleteEmployeeAction,
    createEmployeeAction,
    subscribeToEmployees,
    nextPageEmployees,
    prevPageEmployees,
    getPageToken,
    setCurrentPage,
    removeTokenToList,
    setEmployee,
    invalidateTokensFrom,
    hasTokenForPage,
    verifyAndSetNextToken,
    toggleShowUseFilter,
    clearTokenList,

  } = useEmployee();

  const isLoading = ref(false);
  const showFavourites = ref(false);
  let unsubscribe: (() => void) | null = null;


  const isNextActive = computed(() => {
    return hasTokenForPage(currentPage.value + 1);
  });

  const isPrevActive = computed(() => {
    return currentPage.value > 1;
  });

  async function fetchEmployees(token: string | null = null) {
    isLoading.value = true;
    try {
      const res = await getEmployees(token);
      if (res !== null) {
        const { items, nextToken } = res;
        setEmployee(items);

        console.log(items, 'items 11212');

        if (nextToken) {
          await verifyAndSetNextToken(nextToken, currentPage.value + 1);
        }
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
  async function toggleFavourite(data: Employee) {
    const input: UpdateEmployeeInput = {
      id: data.id,
      isFavourite: data.isFavourite === 'true' ? 'false' : 'true'
    };
    await updateEmployeeAction(input);
  }

  async function updateEmployee(data: Employee) {
    const input: UpdateEmployeeInput = {
      id: data.id,
    };

    if(data.name) {
      input.name = data.name;
    }

    if(data.position) {
      input.position = data.position;
    }

    if(data.isFavourite) {
      input.isFavourite = data.isFavourite;
    }
    const res = await updateEmployeeAction(input);
    console.log(res, 'update');
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

          invalidateTokensFrom(currentPage.value);

          if (nextToken) {
            await verifyAndSetNextToken(nextToken, currentPage.value + 1);
          }
        }
      } else if (type === 'UPDATE') {
        const index = employees.value.findIndex((e) => e.id === data.id);
        if (index !== -1) {
          employees.value[index] = { ...employees.value[index], ...data };
        }
      } else if (type === 'DELETE') {
        const currPageToken = getPageToken(currentPage.value);
        const res = await getEmployees(currPageToken);

        if (res !== null) {
          const { items, nextToken } = res;

          invalidateTokensFrom(currentPage.value);

          if (items.length > 0) {
            setEmployee(items);

            if (nextToken) {
              await verifyAndSetNextToken(nextToken, currentPage.value + 1);
            }
          } else {
            const prevPage = Math.max(1, currentPage.value - 1);

            removeTokenToList(currentPage.value);

            if (prevPage !== currentPage.value) {
              setCurrentPage(prevPage);
              const prevPageToken = getPageToken(prevPage);
              const prevPageRes = await getEmployees(prevPageToken);

              if (prevPageRes !== null) {
                setEmployee(prevPageRes.items);

                if (prevPageRes.nextToken) {
                  await verifyAndSetNextToken(prevPageRes.nextToken, prevPage + 1);
                }
              }
            } else {
              setEmployee([]);
            }
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


  watch(tokenList, () => {
    console.log('tokenList changed:', tokenList.value);
  }, {
    immediate: true,
    deep: true
  });

  watch(currentPage, (newCurrentPage) => {
    console.log('currentPage changed:', newCurrentPage);
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
    useFilter,
    tokenList,
    fetchEmployees,
    toggleFavourite,
    removeEmployee,
    addEmployeeAction,
    initSubscriptions,
    stopSubscriptions,
    fetchNextEmployees,
    fetchPrevEmployees,
    toggleShowUseFilter,
    clearTokenList,
    updateEmployee,
  };
});
