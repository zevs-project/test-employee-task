import { ref } from 'vue'
import type { CreateEmployeeInput, Employee, UpdateEmployeeInput, DeleteEmployeeInput } from '@/API'
import { listEmployees } from '@/graphql/queries.ts'
import { updateEmployee, deleteEmployee, createEmployee } from '@/graphql/mutations'
import { onCreateEmployee, onUpdateEmployee, onDeleteEmployee } from '@/graphql/subscriptions'
import { API, graphqlOperation } from 'aws-amplify'

export function useEmployee() {
  const employees = ref<Employee[]>([])

  async function getEmployees(limit?: number) {
    if (!limit) limit = 3
    const response = (await API.graphql(
      // graphqlOperation(listEmployees, { limit: limit })
      { query: listEmployees, variables: { limit: limit } },
    )) as any

    console.log(response, 'response')
    const items = response.data.listEmployees.items || []
    employees.value = items.filter((item: Employee): item is Employee => !!item)
  }

  async function updateFavoriteAction(input: UpdateEmployeeInput) {
    try {
      await API.graphql(graphqlOperation(updateEmployee, { input }))
    } catch (error) {
      console.error('Error updated employee:', error)
    }
  }

  async function deleteEmployeeAction(id: string) {
    try {
      await API.graphql(graphqlOperation(deleteEmployee, { input: { id } }))
    } catch (error) {
      console.error('Error updated employee:', error)
    }
  }

  async function setEmployee(input: CreateEmployeeInput) {
    try {
      await API.graphql(graphqlOperation(createEmployee, { input }))
    } catch (error) {
      console.error('Error creating employee:', error)
    }
  }

  function subscribeToEmployees(onData: (data: any, type: 'CREATE' | 'UPDATE' | 'DELETE') => void) {
    const createSub = (API.graphql({ query: onCreateEmployee }) as any).subscribe({
      next: ({ value }: any) => onData(value.data.onCreateEmployee, 'CREATE'),
    })
    const updateSub = (API.graphql({ query: onUpdateEmployee }) as any).subscribe({
      next: ({ value }: any) => onData(value.data.onUpdateEmployee, 'UPDATE'),
    })
    const deleteSub = (API.graphql({ query: onDeleteEmployee }) as any).subscribe({
      next: ({ value }: any) => onData(value.data.onDeleteEmployee, 'DELETE'),
    })

    return () => {
      createSub.unsubscribe()
      updateSub.unsubscribe()
      deleteSub.unsubscribe()
    }
  }

  return {
    employees,
    getEmployees,
    updateFavoriteAction,
    deleteEmployeeAction,
    setEmployee,
    subscribeToEmployees,
  }
}
