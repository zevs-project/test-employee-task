<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue';
import InputText from 'primevue/inputtext';
import { Button } from 'primevue';

const props = defineProps<{ isShowFavourites: boolean }>(
);

const searchText = ref('');
const addButtonLabel = 'Add new';
const showFavouritesButtonLabel = computed(() => props.isShowFavourites ? 'Hide favourites' : 'Show favourites');

const emit = defineEmits<{
  (e: 'addEmployee'): void
  (e: 'showFavouritesEmployee'): void
  (e: 'searchEmployee', value: string): void
}>();

let searchDebounceTimer: ReturnType<typeof setTimeout> | null = null;

watch(searchText, (value) => {
  if (searchDebounceTimer) {
    clearTimeout(searchDebounceTimer);
  }

  searchDebounceTimer = setTimeout(() => {
    emit('searchEmployee', value);
  }, 400);
});

onBeforeUnmount(() => {
  if (searchDebounceTimer) {
    clearTimeout(searchDebounceTimer);
  }
});

function emitAddEmployee() {
  emit('addEmployee');
}

function emitShowFavouritesEmployee() {
  emit('showFavouritesEmployee');
}

</script>

<template>
  <div class="employee-top-menu">
    <InputText id="searchText" placeholder="Search user" v-model="searchText" />

    <Button :label="showFavouritesButtonLabel" @click="emitShowFavouritesEmployee"></Button>

    <Button :label="addButtonLabel" @click="emitAddEmployee"></Button>
  </div>
</template>

<style scoped>
.employee-top-menu {
  gap: 10px 30px;
  display: flex;
  justify-content: flex-start;
}
</style>
