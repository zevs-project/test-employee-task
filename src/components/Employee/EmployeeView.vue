<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import type { CreateEmployeeInput } from '@/API';
import { useEmployeeStore } from '@/stores/EmployeeStore';
import { EmployeeList, EmployeeCreate, EmployeeTopMenu } from '@/components/Employee/index';
import type { TPosition } from '@/types/TPosition';
import Dialog from 'primevue/dialog';

defineProps<{ positions: TPosition }>();

const employeeStore = useEmployeeStore();
const createDialogVisible = ref(false);

async function createEmployee(input: CreateEmployeeInput) {
  await employeeStore.addEmployeeAction(input);
}

function showFavouritesEmployee() {
  employeeStore.toggleShowUseFilter();
  employeeStore.fetchEmployees(null);
}

function showCreateDialog() {
  createDialogVisible.value = true;
}

onMounted(() => {
  employeeStore.fetchEmployees(null);
  employeeStore.initSubscriptions();
});

onUnmounted(() => {
  employeeStore.stopSubscriptions();
});
</script>

<template>
  <div class="employee-view">
    <EmployeeTopMenu
      @show-favourites-employee="showFavouritesEmployee"
      @add-employee="showCreateDialog"
      :is-show-favourites="employeeStore.useFilter"
    ></EmployeeTopMenu>

    <Dialog
      v-model:visible="createDialogVisible"
      modal
      header="Edit Profile"
      :style="{ width: '25rem' }"
    >
      <EmployeeCreate :positions="positions" @employee-created="createEmployee"></EmployeeCreate>
    </Dialog>

    <EmployeeList
      :employees="employeeStore.employees"
      :positions="positions"
      @toggle-favourite="(data) => employeeStore.toggleFavouriteAction(data)"
      @remove="employeeStore.removeEmployee"
      @next-page="employeeStore.fetchNextEmployees"
      @prev-page="employeeStore.fetchPrevEmployees"
    ></EmployeeList>
  </div>
</template>

<style scoped></style>
