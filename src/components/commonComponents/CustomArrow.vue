<script setup lang="ts">
import { useEmployeeStore } from '@/stores/EmployeeStore';

const employeeStore = useEmployeeStore();
const emit = defineEmits(['nextPage', 'prevPage']);

</script>

<template>
  <div class="custom-arrow-wrapper">
    <i class="pi pi-arrow-circle-left" :class="{inactive: !employeeStore.isPrevActive}" @click="emit('prevPage')"></i>
    <i>Current page {{ employeeStore.currentPage }}</i>
    <i class="pi pi-arrow-circle-right" :class="{inactive: !employeeStore.isNextActive}" @click="emit('nextPage')"></i>

    {{ employeeStore.isPrevActive }}
    {{ employeeStore.isNextActive }}
  </div>
</template>

<style scoped lang="scss">
.custom-arrow-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-content: center;
  gap: 10px;
  margin-top: 20px;

  .pi {
    font-size: 20px;

    &.inactive {
      pointer-events: none;
      opacity: 0.4;
    }
  }


}
</style>
