import { createPinia } from 'pinia'
import { resetSetupStore } from './plugins/index.js'

export * from './modules'

export function setupStore(app) {
  const store = createPinia()
  store.use(resetSetupStore)
  app.use(store)
}
