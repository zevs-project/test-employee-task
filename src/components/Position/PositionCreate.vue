<script setup lang="ts">
import { Card, InputText, Button, FileUpload } from 'primevue'
import { ref } from 'vue'
import type { CreatePositionInput } from '@/API.ts'

const emit = defineEmits<{
  (e: 'positionCreated', input: CreatePositionInput, file: File): void
}>()

const title = ref('')
const selectedFile = ref<File | null>(null)
const iconName = ref('')
const isLoaded = ref(false)

async function setPositions() {
  if (!title.value || !selectedFile.value) return
  emit('positionCreated', { title: title.value, icon: iconName.value }, selectedFile.value as File)

  title.value = ''
  selectedFile.value = null
  iconName.value = ''
}

const onUpload = async (event) => {
  selectedFile.value = event.files[0]
  iconName.value = selectedFile.value?.name ? selectedFile.value.name : 'default'
  isLoaded.value = true

  console.log(selectedFile.value)
}
</script>

<template>
  <Card class="position-create">
    <template #title>Set new position</template>
    <template #content>
      <InputText type="text" v-model="title" />

      <FileUpload
        mode="basic"
        name="icon"
        accept="image/*"
        :maxFileSize="1000000"
        :auto="true"
        @uploader="onUpload"
        :customUpload="true"
        chooseLabel="Обрати іконку"
      />

      <Button
        label="Create position"
        :class="{ disabled: !isLoaded }"
        @click="setPositions"
      ></Button>
    </template>
  </Card>
</template>

<style scoped lang="scss">
.position-create {
  .p-button {
    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }
  }
  :deep(.p-card-content) {
    display: flex;
    gap: 15px;
  }
}
</style>
