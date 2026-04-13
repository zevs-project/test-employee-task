<script setup lang="ts">
import { Card } from 'primevue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import type { Employee } from '@/API.ts'
import CustomArrow from '@/components/commonComponents/CustomArrow.vue'

const props = defineProps<{
  employees: Employee[]
}>()

const emit = defineEmits<{
  edit: [employee: Employee]
  remove: [id: string]
  toggleFavourite: [employee: Employee],
  nextPage: [],
  prevPage: []
}>()

const onPage = (event: any) => {
  console.log('Pagination changed:', event)
}
</script>

<template>
  <Card>
    <template #title>Set new employee</template>
    <template #content>
      <div class="table-view">
        <DataTable
          :value="employees"
          :paginator="false"
          :rows="3"
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
                <span>{{ slotProps.data.position || 'No position' }}</span>
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
        <CustomArrow @next-page="emit('nextPage')" @prev-page="emit('prevPage')"></CustomArrow>
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
