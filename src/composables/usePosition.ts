import { ref } from 'vue'
import type { Position, CreatePositionInput, GetPositionQueryVariables } from '@/API.ts'
import { listPositions, getPosition } from '@/graphql/queries.ts'
import { createPosition, deletePosition } from '@/graphql/mutations'
import { onCreatePosition, onUpdatePosition, onDeletePosition } from '@/graphql/subscriptions'
import { API, graphqlOperation } from 'aws-amplify'
import { Storage } from 'aws-amplify'

export function usePosition() {
  const positions = ref<Position[]>([])

  async function getPositions() {
    const response = (await API.graphql(graphqlOperation(listPositions))) as any
    const items: Position[] = response.data.listPositions.items || []
    positions.value = items.filter((item): item is Position => !!item)
  }

  async function getSinglePosition(data: GetPositionQueryVariables) {
    const response = (await API.graphql(graphqlOperation(getPosition), data)) as any
    console.log(response, 'get single')
  }

  async function setPositions(input: CreatePositionInput) {
    await API.graphql(graphqlOperation(createPosition, { input }))
  }

  function subscribeToPositions(onData: (data: any, type: 'CREATE' | 'UPDATE' | 'DELETE') => void) {
    const createSub = (API.graphql(graphqlOperation(onCreatePosition)) as any).subscribe({
      next: ({ value }: any) => onData(value.data.onCreatePosition, 'CREATE')
    })
    const updateSub = (API.graphql(graphqlOperation(onUpdatePosition)) as any).subscribe({
      next: ({ value }: any) => onData(value.data.onUpdatePosition, 'UPDATE')
    })
    const deleteSub = (API.graphql(graphqlOperation(onDeletePosition)) as any).subscribe({
      next: ({ value }: any) => onData(value.data.onDeletePosition, 'DELETE')
    })

    return () => {
      createSub.unsubscribe();
      updateSub.unsubscribe();
      deleteSub.unsubscribe();
    };
  }

  async function deletePositionAction(id: string) {
    try {
      await API.graphql(graphqlOperation(deletePosition, { input: { id } }))
    } catch (error) {
      console.error('Error updated employee:', error)
    }
  }

  return {
    positions,
    getPositions,
    setPositions,
    subscribeToPositions,
    deletePositionAction,
  }
}
