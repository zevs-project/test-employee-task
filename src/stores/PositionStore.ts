import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { usePosition } from '@/composables/usePosition'
import { useStorage } from '@/composables/useStorage'
import type { CreatePositionInput } from '@/API.ts'

export const usePositionStore = defineStore('PositionStore', () => {
  const { positions, getPositions, setPositions, subscribeToPositions, deletePositionAction } =
    usePosition()

  const storage = useStorage()
  const isLoading = ref(false)
  let unsubscribe: (() => void) | null = null

  async function fetchPositions(force = false) {
    if (positions.value.length > 0 && !force) return
    isLoading.value = true
    try {
      await getPositions()
    } finally {
      isLoading.value = false
    }
  }

  const positionOptions = computed(() =>
    positions.value.map((p) => ({ label: p.title, value: p.id })),
  )

  async function createPosition(input: CreatePositionInput, file?: File) {
    if (file) {
      try {
        console.log(file, 'file')
        const fileName = input?.icon ? input.icon : 'default'

        await storage.saveImage(fileName, file, {
          contentType: file.type,
        })
        console.log('File uploaded with Storage.put')
      } catch (error) {
        console.error('Error uploading file:', error)
      }
    }

    await setPositions(input)
  }

  function initSubscriptions() {
    if (unsubscribe) return

    unsubscribe = subscribeToPositions((data, type) => {
      if (type === 'CREATE') {
        if (!positions.value.find((p) => p.id === data.id)) {
          positions.value.push(data)
        }
      } else if (type === 'UPDATE') {
        const index = positions.value.findIndex((p) => p.id === data.id)
        if (index !== -1) positions.value[index] = { ...positions.value[index], ...data }
      } else if (type === 'DELETE') {
        positions.value = positions.value.filter((p) => p.id !== data.id)
      }
    })
  }

  function stopSubscriptions() {
    if (unsubscribe) {
      unsubscribe()
      unsubscribe = null
    }
  }

  async function removePosition(id: string) {
    await deletePositionAction(id)
  }

  return {
    positions,
    isLoading,
    fetchPositions,
    positionOptions,
    createPosition,
    initSubscriptions,
    stopSubscriptions,
    removePosition,
  }
})
