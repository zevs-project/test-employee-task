<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { Card } from 'primevue'
import DataTable from 'primevue/datatable'

import Column from 'primevue/column'
import Button from 'primevue/button'
import type { Position } from '@/API.ts'

import { useStorage } from '@/composables/useStorage'

const props = defineProps<{
  positions: Position[]
}>()

const emit = defineEmits<{
  edit: [position: Position]
  delete: [id: string]
  toggleFavourite: [position: Position]
}>()

const storage = useStorage()

const iconUrls = ref<Record<string, string>>({})

watchEffect(async () => {
  for (const position of props.positions) {
    if (position.icon && !iconUrls.value[position.icon]) {
      try {
        iconUrls.value[position.icon] = await storage.getImage(position.icon)
      } catch (error) {
        console.error(`Error fetching icon for ${position.icon}:`, error)
        iconUrls.value[position.icon] = ''
      }
    }
  }
})

const onPage = (event: any) => {
  console.log('Position pagination changed:', event)
}
</script>

<template>
  <Card>
    <template #title>Positions</template>
    <template #content>
      <div class="table-view">
        <DataTable
          :value="positions"
          :paginator="true"
          :rows="6"
          dataKey="id"
          class="custom-table"
          paginatorTemplate="PrevPageLink NextPageLink"
          responsiveLayout="scroll"
          @page="onPage"
        >
          <Column field="name" header="Icon" style="width: 5%">
            <template #body="slotProps">
              <img
                v-if="iconUrls[slotProps.data?.icon]"
                :src="iconUrls[slotProps.data?.icon]"
                alt="Position Icon"
                class="h-1 w-1 inline-block ml-2 icon"
              />
            </template>
          </Column>

          <Column header="Position" style="width: 40%">
            <template #body="slotProps: { data: Position }">
              {{ slotProps.data?.title || 'No position' }}
            </template>
          </Column>

          <Column style="width: 25%">
            <template #body="slotProps">
              <div class="flex justify-end gap-2">
                <Button
                  icon="pi pi-trash"
                  variant="text"
                  severity="danger"
                  rounded
                  @click="emit('delete', slotProps.data.id)"
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
.icon {
  width: 30px;
  height: 30px;
}
</style>
