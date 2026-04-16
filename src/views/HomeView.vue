<script setup lang="ts">
import { Authenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';
import { Button } from 'primevue';
import 'primeicons/primeicons.css';
import { EmployeeView } from '@/components/Employee/index';
import { usePositionStore } from '@/stores/PositionStore';

const { positions } = usePositionStore();
</script>

<template>
  <main>
    <authenticator>
      <template v-slot="{ user, signOut }">
        <!-- Використовуємо дані зі сторів -->
        <div class="view">
          <Button :label="'Sign out'" @click="signOut()"></Button>

          <EmployeeView :positions="positions"></EmployeeView>
        </div>
      </template>
    </authenticator>
  </main>
</template>

<style lang="scss">
.view {
  display: flex;
  gap: 10px;
  flex-direction: column;
}
</style>
