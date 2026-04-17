<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import type { CreateEmployeeInput } from '@/API';
import { useEmployeeStore } from '@/stores/EmployeeStore';
import { EmployeeList, EmployeeCreate, EmployeeTopMenu } from '@/components/Employee/index';
import type { TPosition } from '@/types/TPosition';
import Dialog from 'primevue/dialog';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import type { ToastMessageOptions } from 'primevue/toast';

defineProps<{ positions: TPosition }>();

const employeeStore = useEmployeeStore();
const createDialogVisible = ref(false);
const toast = useToast();

async function createEmployee(input: CreateEmployeeInput) {
  await employeeStore.addEmployeeAction(input);
}

function showFavouritesEmployee() {
  employeeStore.toggleShowUseFilter();
  employeeStore.clearTokenList();
  employeeStore.fetchEmployees(null);
}

async function onSearchEmployee(term: string) {
  await employeeStore.searchEmployees(term);
}

function showCreateDialog() {
  createDialogVisible.value = true;
}

const showMessage = (type: ToastMessageOptions['severity'], text: string) => {
  toast.add({
    severity: type,
    summary: 'Сповіщення',
    detail: text,
    life: 3000
  });

  setTimeout(() => {
    employeeStore.closeInfoPopup();
  }, 3000);

};

onMounted(() => {
  employeeStore.fetchEmployees(null);
  employeeStore.initSubscriptions();
});

onUnmounted(() => {
  employeeStore.stopSubscriptions();
});

watch(() => employeeStore.isVisibleInfoPopup, (newVisible) => {
  console.log('watch', newVisible);

  if (employeeStore.isVisibleInfoPopup) {
    showMessage('success', 'Employee toggle successfully');
  }
});
</script>

<template>
  <div class="employee-view">
    <Toast />

    <EmployeeTopMenu
      @show-favourites-employee="showFavouritesEmployee"
      @add-employee="showCreateDialog"
      @search-employee="onSearchEmployee"
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

    <Dialog
      v-model:visible="createDialogVisible"
      modal
      header="Edit Profile"
      :style="{ width: '25rem' }"
    >
    </Dialog>

    <EmployeeList
      :employees="employeeStore.employees"
      :positions="positions"
      @toggle-favourite="(data) => employeeStore.toggleFavourite(data)"
      @update="(data) => employeeStore.updateEmployee(data)"
      @remove="employeeStore.removeEmployee"
      @next-page="employeeStore.fetchNextEmployees"
      @prev-page="employeeStore.fetchPrevEmployees"
    ></EmployeeList>
  </div>
</template>

<style scoped></style>
