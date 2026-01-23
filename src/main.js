import 'virtual:uno.css'
import 'virtual:svg-icons-register'
import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import { setupRouter } from './router'
import { setupNaiveDiscreteApi, setupLoading } from './plugins'
import { setupStore } from '@/stores/index.js'
import { setupDirectives } from '@/directives/index.js'

void bootstrap()

async function bootstrap() {
  setupLoading()

  const app = createApp(App)
  setupNaiveDiscreteApi()
  setupStore(app)
  setupDirectives(app)
  await setupRouter(app)
  app.mount('#app')
}
