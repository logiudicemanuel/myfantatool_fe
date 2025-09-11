import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '../src/assets/main.css'

import App from './App.vue'
import router from './router'
import { login } from './composable/useDirectus';

async function boot() {
  // Login globale all’avvio
  await login('admin@example.com', 'admin');

  const app = createApp(App)

  app.use(createPinia())
  app.use(router)

  app.mount('#app')
}

boot();

