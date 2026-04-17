<script setup lang="ts">
import { Card } from 'primevue';
import { useToast } from "primevue/usetoast";
import type { TInfoPopupTypes } from '@/types/TInfoPopupTypes.ts';

defineProps<{
  visible: boolean,
  type: TInfoPopupTypes,
  message: string
}>();

const showMessage = (type: 'success' | 'error', text: string) => {
  toast.add({
    severity: type,
    summary: type.toUpperCase(),
    detail: text,
    life: 3000
  });
};
</script>

<template>
  <Card v-show="visible">
    <template #title>Set new employee</template>
    <template #content>
      <div style="display: flex; flex-direction: column; gap: 1rem">

      </div>
    </template>
  </Card>
</template>

<style scoped></style>
