<script setup lang="ts">
import { Card } from 'primevue'
import DataTable from 'primevue/datatable'

import Column from 'primevue/column'
import Button from 'primevue/button'
import type { Employee } from '@/API.ts'
import { useStorage } from '@/composables/useStorage.ts'
import { ref, watchEffect } from 'vue'

const props = defineProps<{
  employees: Employee[]
}>()

const emit = defineEmits<{
  edit: [employee: Employee]
  remove: [id: string]
  toggleFavourite: [employee: Employee]
}>()

const storage = useStorage()
const iconUrls = ref<Record<string, string>>({})

watchEffect(async () => {
  for (const employee of props.employees) {
    const iconKey = employee.position?.icon
    if (iconKey && !iconUrls.value[iconKey]) {
      try {
        iconUrls.value[iconKey] = await storage.getImage(iconKey)
      } catch (error) {
        console.error(`Error fetching icon for ${iconKey}:`, error)
        iconUrls.value[iconKey] = '' // Set to empty string to avoid re-fetching on error
      }
    }
  }
})

const onPage = (event: any) => {
  console.log('Pagination changed:', event)
  // event.page - індекс нової сторінки
  // event.first - індекс першого елемента на сторінці
}
</script>

<template>
  <Card>
    <template #title>Set new employee</template>
    <template #content>
      <div class="table-view">
        <DataTable
          :value="employees"
          :paginator="true"
          :rows="6"
          dataKey="id"
          class="custom-table"
          paginatorTemplate="PrevPageLink NextPageLink"
          responsiveLayout="scroll"
          @page="onPage"
        >
          <Column field="name" header="Name" style="width: 35%"></Column>

          <Column header="Position" style="width: 40%">
            <template #body="slotProps: { data: Employee }">
              <div class="block">
                <span>{{ slotProps.data.position?.title || 'No position' }}</span>
                <img
                  v-if="slotProps.data.position?.icon && iconUrls[slotProps.data.position.icon]"
                  :src="iconUrls[slotProps.data.position.icon]"
                  alt="Position Icon"
                  class="h-1 w-1 inline-block ml-2 icon"
                  style="width: 30px; height: 30px; object-fit: contain"
                />
                <i
                  v-else-if="slotProps.data.position?.icon"
                  class="pi pi-image"
                  style="font-size: 1.5rem; color: #ccc"
                ></i>
              </div>
            </template>
          </Column>

          <Column style="width: 25%">
            <template #body="slotProps">
              <div class="flex justify-end gap-2">
                <Button
                  icon="pi pi-pencil"
                  variant="text"
                  severity="secondary"
                  rounded
                  @click="emit('edit', slotProps.data)"
                />

                <Button
                  :icon="slotProps.data.isFavourite === 'true' ? 'pi pi-star-fill' : 'pi pi-star'"
                  variant="text"
                  :severity="slotProps.data.isFavourite === 'true' ? 'contrast' : 'secondary'"
                  rounded
                  @click="emit('toggleFavourite', slotProps.data)"
                />

                <Button
                  icon="pi pi-trash"
                  variant="text"
                  severity="danger"
                  rounded
                  @click="emit('remove', slotProps.data.id)"
                />
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
    </template>
  </Card>
</template>

<style scoped lang="scss">
:deep(.p-row-even) {
  td {
  }
}

.block {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 10px;
}
</style>
