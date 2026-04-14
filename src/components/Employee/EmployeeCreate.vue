<script setup lang="ts">
import { Card, Select, InputText, Button } from 'primevue'
import { computed, ref } from 'vue'
import type { CreateEmployeeInput, Position } from '@/API'

const props = defineProps<{
  positions: Position[]
}>()

const emit = defineEmits<{
  (e: 'employeeCreated', employee: CreateEmployeeInput): void
}>()

const selectedPosition = ref('')
const employeeName = ref('')

const filteredPosition = computed(() => {
  return props.positions.map((position) => position.title)
})

const positionId = computed((): string => {
  if (!selectedPosition.value) return ''
  const found = props.positions.find((p) => p.title === selectedPosition.value)
  return found ? found.id : ''
})

async function setEmployee() {
  if (!positionId.value || !employeeName.value) {
    console.warn('Position and Name are required')
    return
  }

  const employee: CreateEmployeeInput = {
    name: employeeName.value,
    isFavourite: 'false',
    positionId: positionId.value,
  }

  employeeName.value = ''
  selectedPosition.value = ''
  emit('employeeCreated', employee)
}
</script>

<template>
  <Card>
    <template #title>Set new employee</template>
    <template #content>
      <div style="display: flex; flex-direction: column; gap: 1rem">
        <Select
          :options="filteredPosition"
          v-model="selectedPosition"
          placeholder="Select Position"
        ></Select>
        <InputText v-model="employeeName" placeholder="Employee Name"></InputText>
        <Button label="Create employee" @click="setEmployee"></Button>
      </div>
    </template>
  </Card>
</template>

<style scoped></style>
