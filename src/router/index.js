import { createRouter, createWebHistory } from 'vue-router'
import {routes} from './modules'
import {setupRouterGuard} from './guare/index.js'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export async function setupRouter(app) {
  app.use(router)
  setupRouterGuard(router)
  await router.isReady()
}
