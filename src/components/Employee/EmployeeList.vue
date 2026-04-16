<script setup lang="ts">
import { InputText, Button, Column, Card, Select } from 'primevue';
import DataTable, { type DataTableCellEditCompleteEvent } from 'primevue/datatable';
import type { Employee } from '@/API.ts';
import CustomArrow from '@/components/commonComponents/CustomArrow.vue';
import { usePositionStore } from '@/stores/PositionStore';
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import type { IEmployeeEdit } from '@/types/TEmployee';

defineProps<{
  employees: Employee[]
}>();

const emit = defineEmits<{
  edit: [employee: Employee]
  update: [employee: Employee]
  remove: [id: string]
  toggleFavourite: [employee: Employee],
  nextPage: [],
  prevPage: []
}>();
const positionsStore = usePositionStore();
const { positions } = storeToRefs(positionsStore);

const editComponentId = ref('');
const editComponentList = ref<IEmployeeEdit[] | null>(null);

const isEditMode = computed(() => !!editComponentId.value);
const cellEdit = computed(() => isEditMode.value ? 'cell' : '');

const onCellEditComplete = (event: DataTableCellEditCompleteEvent) => {
  const { data, field, newValue } = event;
  if (field !== undefined) {
    (data)[field] = newValue;
  }

  saveComponentList(data.id, data);
};

function updateEdit(data: Employee) {
  emit('edit', data);
  setEditComponentId(data.id);
}

function saveEmployee() {
  const component = getEditComponent();

  if (component) {
    emit('update', component);
    removeEditComponentId();
  }
}

function setEditComponentId(id: string) {
  editComponentId.value = id;
}

function removeEditComponentId() {
  editComponentId.value = '';
}

function isEdit(id: string) {
  return editComponentId.value === id;
}

function saveComponentList(id: string, data: Employee) {
  if (!editComponentList.value) {
    editComponentList.value = [];
  }
  const index = editComponentList.value.findIndex((item) => item.id === id);
  if (index >= 0) {
    editComponentList.value[index] = { id, data };
    return;
  }
  editComponentList.value.push({ id, data });
}

function getEditComponent(): Employee | null {
  if (!editComponentList.value) {
    return null;
  }

  const component = editComponentList.value.find((item) => item.id === editComponentId.value);
  return component ? component.data : null;
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
          @cell-edit-complete="onCellEditComplete"
          :editMode="cellEdit"
          paginatorTemplate="PrevPageLink NextPageLink"
          responsiveLayout="scroll"
        >
          <Column field="name" header="Name" style="width: 35%">
            <template #editor="{ data, field }">
              <InputText v-model="data[field]" />
            </template>
          </Column>

          <Column header="Position" style="width: 40%">
            <template #body="slotProps: { data: Employee }">
              <div class="block" v-show="!isEdit(slotProps.data.id)">
                <span>{{ slotProps.data.position || 'No position' }}</span>
              </div>

              <Select
                :options="positions"
                v-model="slotProps.data.position"
                placeholder="Select Position"
                v-show="isEdit(slotProps.data.id)"
              ></Select>
            </template>
          </Column>

          <Column style="width: 25%">
            <template #body="slotProps">
              <div class="flex justify-end gap-2">

                <Button
                  icon="pi pi-save"
                  variant="text"
                  severity="secondary"
                  v-show="isEdit(slotProps.data.id)"
                  @click="saveEmployee(slotProps.data)"
                  rounded
                />

                <Button
                  icon="pi pi-pencil"
                  :class="{active: isEdit(slotProps.data.id)}"
                  class="edit-button"
                  variant="text"
                  severity="secondary"
                  rounded
                  v-show="!isEdit(slotProps.data.id)"
                  @click="updateEdit(slotProps.data)"
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
:deep(.table-view) {
  .edit-button {
    .pi-pencil {
      &::before {
        color: #000;
        opacity: 0.4;
      }
    }

    &.active {
      .pi-pencil {
        &::before {
          opacity: 1;
        }
      }
    }
  }
}

.block {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 10px;
}


</style>
