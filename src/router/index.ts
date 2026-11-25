/*
 * 路由
 * */

import type { App } from 'vue'
import type { Router } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { staticRoutes } from './routes'
import { setupRouterGuard } from './guard'

export const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...staticRoutes],
})

export async function setupRouter(app: App): Promise<void> {
  app.use(router)
  setupRouterGuard(router)
  await router.isReady()
}
