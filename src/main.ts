import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Amplify } from 'aws-amplify';
import amplifyconfig from './amplifyconfiguration.json';

Amplify.configure(amplifyconfig);

import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura, // Встановлюємо пресет Aura
    options: {
      darkModeSelector: '.my-app-dark', // Селектор для темної теми (необов'язково)
      cssLayer: false // Якщо використовуєте Tailwind, краще поставити true
    }
  }
});

app.mount('#app');
