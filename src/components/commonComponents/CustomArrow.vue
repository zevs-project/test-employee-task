<script setup lang="ts">
const emit = defineEmits(['nextPage', 'prevPage']);
</script>

<template>
  <div class="custom-arrow-wrapper">
    <i class="pi pi-arrow-circle-left" @click="emit('prevPage')"></i>
    <i class="pi pi-arrow-circle-right" @click="emit('nextPage')"></i>
  </div>
</template>

<style scoped>
.custom-arrow-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-content: center;
  gap: 10px;
  margin-top: 20px;

  .pi {
    font-size: 20px;
  }
}
</style>
