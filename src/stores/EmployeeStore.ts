import { ref, computed, watch } from 'vue';
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
    removeTokenToList,
    setEmployee,
    invalidateTokensFrom,
    hasTokenForPage,
    verifyAndSetNextToken
  } = useEmployee();

  const isLoading = ref(false);
  const showFavourites = ref(false);
  let unsubscribe: (() => void) | null = null;

  // Computed властивості для стану кнопок пагінації
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

        // Перевіряємо чи наступна сторінка має елементи перед збереженням токена
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
        // При створенні — рефетч поточної сторінки і інвалідація токенів далі
        const currPageToken = getPageToken(currentPage.value);
        const res = await getEmployees(currPageToken);

        if (res !== null) {
          const { items, nextToken } = res;
          setEmployee(items);

          // Інвалідуємо всі токени після поточної сторінки
          invalidateTokensFrom(currentPage.value);

          // Перевіряємо чи наступна сторінка має елементи перед збереженням токена
          if (nextToken) {
            await verifyAndSetNextToken(nextToken, currentPage.value + 1);
          }
        }
      } else if (type === 'UPDATE') {
        // При оновленні — просто оновлюємо елемент в списку
        const index = employees.value.findIndex((e) => e.id === data.id);
        if (index !== -1) {
          employees.value[index] = { ...employees.value[index], ...data };
        }
      } else if (type === 'DELETE') {
        // При видаленні — рефетч поточної сторінки
        const currPageToken = getPageToken(currentPage.value);
        const res = await getEmployees(currPageToken);

        if (res !== null) {
          const { items, nextToken } = res;

          // Інвалідуємо всі токени після поточної сторінки
          invalidateTokensFrom(currentPage.value);

          if (items.length > 0) {
            setEmployee(items);

            // Перевіряємо чи наступна сторінка має елементи перед збереженням токена
            if (nextToken) {
              await verifyAndSetNextToken(nextToken, currentPage.value + 1);
            }
          } else {
            // Якщо на поточній сторінці немає елементів — переходимо на попередню
            const prevPage = Math.max(1, currentPage.value - 1);

            // Видаляємо токен для поточної сторінки
            removeTokenToList(currentPage.value);

            if (prevPage !== currentPage.value) {
              setCurrentPage(prevPage);
              const prevPageToken = getPageToken(prevPage);
              const prevPageRes = await getEmployees(prevPageToken);

              if (prevPageRes !== null) {
                setEmployee(prevPageRes.items);

                // Перевіряємо чи наступна сторінка має елементи
                if (prevPageRes.nextToken) {
                  await verifyAndSetNextToken(prevPageRes.nextToken, prevPage + 1);
                }
              }
            } else {
              // Ми на сторінці 1 і вона пуста
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

  function toggleFavourites() {
    showFavourites.value = !showFavourites.value;
  }

  // Deep watch для tokenList — щоб бачити зміни всередині масивів
  watch(tokenList, () => {
    // computed властивості автоматично перераховуються
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
