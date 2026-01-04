/*
* 路由
* */

/**
 * 路由对象
 * @typedef {import('vue-router').RouteLocation} RouteLocation
 */

import { createRouter, createWebHistory } from 'vue-router'
import { staticRoutes } from './routes'
import { setupRouterGuard } from './guard'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...staticRoutes],
})

export async function setupRouter(app) {
  app.use(router)
  setupRouterGuard(router)
  await router.isReady()
}
