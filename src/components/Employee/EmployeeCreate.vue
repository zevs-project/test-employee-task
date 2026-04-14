<script setup lang="ts">
import { Card, Select, InputText, Button } from 'primevue';
import { computed, ref } from 'vue';
import type { CreateEmployeeInput } from '@/API';
import type { TPosition, TPositionKeys } from '@/types/TPosition.ts';

defineProps<{
  positions: TPosition
}>();

const emit = defineEmits<{
  (e: 'employeeCreated', employee: CreateEmployeeInput): void
}>();

const selectedPosition = ref<TPositionKeys | ''>('');
const employeeName = ref('');

async function setEmployee() {
  const employee: CreateEmployeeInput = {
    name: employeeName.value,
    isFavourite: 'false',
    position: selectedPosition.value as string
  };

  employeeName.value = '';
  selectedPosition.value = '';
  emit('employeeCreated', employee);
}
</script>

<template>
  <Card>
    <template #title>Set new employee</template>
    <template #content>
      <div style="display: flex; flex-direction: column; gap: 1rem">
        <Select
          :options="positions"
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
