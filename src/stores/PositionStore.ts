import { defineStore } from 'pinia';
import type { TPosition } from '@/types/TPosition.ts';
import { ref } from 'vue';

export const usePositionStore = defineStore('PositionStore', () => {
  const positions = ref<TPosition>(['Developer', 'PM', 'Delivery', 'TL']);

  return {
    positions
  };
});
