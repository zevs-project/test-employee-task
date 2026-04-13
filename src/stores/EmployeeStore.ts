import { ref, onUnmounted } from 'vue'
import { defineStore } from 'pinia'
import { useEmployee } from '@/composables/useEmployee'
import type { Employee, CreateEmployeeInput, UpdateEmployeeInput } from '@/API'

export const useEmployeeStore = defineStore('EmployeeStore', () => {
  const {
    employees,
    tokenList,
    currentPage,
    getEmployees,
    updateFavoriteAction,
    deleteEmployeeAction,
    setEmployee,
    getFavouritesEmployees,
    subscribeToEmployees,
    nextPageEmployees,
    prevPageEmployees,
    setTokenToList,
  } = useEmployee()
  const isLoading = ref(false)
  const showFavourites = ref(false)
  let unsubscribe: (() => void) | null = null

  async function fetchEmployees() {
    isLoading.value = true
    try {
      const token = await getEmployees()
      setTokenToList('global', token || '', currentPage.value + 1)
      console.log(tokenList.value, 'tokenList.value')
    } finally {
      isLoading.value = false
    }
  }

  async function fetchNextEmployees(token?: string) {
    isLoading.value = true
    try {
      await nextPageEmployees('global')
    } finally {
      isLoading.value = false
    }
  }

  async function fetchPrevEmployees(token?: string) {
    isLoading.value = true
    try {
      await prevPageEmployees('global')
    } finally {
      isLoading.value = false
    }
  }

  async function fetchFavouritesEmployees(token?: string) {
    isLoading.value = true
    try {
      await getFavouritesEmployees(token)
    } finally {
      isLoading.value = false
    }
  }

  async function toggleFavouriteAction(data: Employee) {
    const input: UpdateEmployeeInput = {
      id: data.id,
      isFavourite: data.isFavourite === 'true' ? 'false' : 'true',
    }
    await updateFavoriteAction(input)
  }

  async function removeEmployee(id: string) {
    console.log('Removing employee with ID:', id)
    await deleteEmployeeAction(id)
  }

  async function createEmployee(input: CreateEmployeeInput) {
    if (!input.isFavourite) input.isFavourite = 'false'
    await setEmployee(input)
  }

  function initSubscriptions() {
    if (unsubscribe) return

    unsubscribe = subscribeToEmployees((data, type) => {
      if (type === 'CREATE') {
        // Додаємо лише якщо такого ID ще немає в списку
        if (!employees.value.find((e) => e.id === data.id)) {
          employees.value.push(data)
        }
      } else if (type === 'UPDATE') {
        const index = employees.value.findIndex((e) => e.id === data.id)
        if (index !== -1) employees.value[index] = { ...employees.value[index], ...data }
      } else if (type === 'DELETE') {
        employees.value = employees.value.filter((e) => e.id !== data.id)
      }
    })
  }

  function stopSubscriptions() {
    if (unsubscribe) {
      unsubscribe()
      unsubscribe = null
    }
  }

  function toggleFavourites() {
    showFavourites.value = !showFavourites.value
  }



  return {
    employees,
    isLoading,
    showFavourites,
    fetchEmployees,
    toggleFavouriteAction,
    removeEmployee,
    createEmployee,
    initSubscriptions,
    stopSubscriptions,
    fetchNextEmployees,
    fetchPrevEmployees,
  }
})
