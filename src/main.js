import 'virtual:uno.css'
import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import { setupRouter } from './router'

bootstrap()

async function bootstrap() {
  const app = createApp(App)

  await setupRouter(app)

  app.mount('#app')
}
