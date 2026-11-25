import '../styles/index.css'
import 'virtual:uno.css'
import 'virtual:svg-icons-register'

import { createApp } from 'vue'

import App from './App.vue'
import { setupRouter } from './router'
import { setupNaiveDiscreteApi, setupLoading } from './plugins'
import { setupStore } from '@/stores/index'
import { setupDirectives } from '@/directives/index'

void bootstrap()

async function bootstrap(): Promise<void> {
  setupLoading()
  setupNaiveDiscreteApi()

  const app = createApp(App)

  setupStore(app)
  setupDirectives(app)
  await setupRouter(app)
  app.mount('#app')
}
