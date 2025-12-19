import 'virtual:uno.css'
import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import { setupRouter } from './router'
import { setupNaiveDiscreteApi } from './plugins'
import { setupStore } from '@/stores/index.js'

bootstrap()

async function bootstrap() {
  const app = createApp(App)
  setupNaiveDiscreteApi()
  setupStore(app)
  await setupRouter(app)
  app.mount('#app')
}
