import { createPinia } from 'pinia'
import type { App } from 'vue'
import { resetSetupStore } from './plugins/index'

export * from './modules'

export function setupStore(app: App): void {
  const store = createPinia()
  store.use(resetSetupStore)
  app.use(store)
}
