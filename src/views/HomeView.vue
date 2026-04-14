<script setup lang="ts">
import EmployeeCreate from '@/components/Employee/EmployeeCreate.vue'
import EmployeeList from '@/components/Employee/EmployeeList.vue'
import PositionCreate from '@/components/Position/PositionCreate.vue'
import PositionList from '@/components/Position/PositionList.vue'
import { Authenticator } from '@aws-amplify/ui-vue'
import '@aws-amplify/ui-vue/styles.css'
import { Button } from 'primevue'
import 'primeicons/primeicons.css'
import { onMounted, onUnmounted } from 'vue'
import { usePositionStore } from '@/stores/PositionStore'
import { useEmployeeStore } from '@/stores/EmployeeStore'
import type { CreateEmployeeInput, CreatePositionInput } from '@/API'

const positionStore = usePositionStore()
const employeeStore = useEmployeeStore()

async function createEmployee(input: CreateEmployeeInput) {
  await employeeStore.createEmployee(input)
}

async function createPosition(input: CreatePositionInput, file: File) {
  await positionStore.createPosition(input, file)
}

onMounted(() => {
  positionStore.fetchPositions()
  employeeStore.fetchEmployees()

  employeeStore.initSubscriptions()
  positionStore.initSubscriptions()
})

onUnmounted(() => {
  employeeStore.stopSubscriptions()
  positionStore.stopSubscriptions()
})
</script>

<template>
  <main>
    <authenticator>
      <template v-slot="{ user, signOut }">
        <!-- Використовуємо дані зі сторів -->
        <EmployeeCreate
          :positions="positionStore.positions"
          @employee-created="createEmployee"
        ></EmployeeCreate>

        <EmployeeList
          :employees="employeeStore.employees"
          @toggle-favourite="(data) => employeeStore.toggleFavourite(data)"
          @delete="employeeStore.removeEmployee"
        ></EmployeeList>

        <PositionCreate
          @position-created="(input, file) => createPosition(input, file)"
        ></PositionCreate>

        <PositionList
          :positions="positionStore.positions"
          @delete="positionStore.removePosition"
        ></PositionList>

        <Button :label="'Sign out'" @click="signOut()"></Button>
      </template>
    </authenticator>
  </main>
</template>
