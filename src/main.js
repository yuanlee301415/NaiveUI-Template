import 'virtual:uno.css'
import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import { setupRouter } from './router'
import {setupStore} from '@/stores/index.js'

bootstrap()

async function bootstrap() {
  const app = createApp(App)

  await setupRouter(app)
  setupStore(app)
  app.mount('#app')
}
