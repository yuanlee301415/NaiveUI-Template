/*
 * 用户权限
 * */

import type { RouteLocationRaw, Router } from 'vue-router'
import { useAuthStore, useRouteStore } from '@/stores/index'
import { LOGIN_ROUTE_NAME } from '@/router/constants'
import { basicRoutes } from '@/router/routes/basic'
import { getAuthToken } from '@/utils/authToken'

export function createPermissionGuard(router: Router): void {
  const routeStore = useRouteStore()

  router.beforeEach(async (to) => {
    // 页面无权限限制
    if (basicRoutes.some((_) => to.path.startsWith(_.path))) {
      return true
    }

    const token = getAuthToken()
    const authStore = useAuthStore()

    // 未登录
    if (!token) {
      return { name: LOGIN_ROUTE_NAME, query: { redirect: to.path } }
    }

    if (authStore.user.name) {
      return true
    }

    // 未授权
    try {
      await authStore.getAuthUser()
      routeStore.addDynamicRoutes(authStore.user.roles ?? [])
      return { ...to, replace: true } as RouteLocationRaw
    } catch (e) {
      console.error('[router.beforeEach]::\n', e)
      return false
    }
  })
}
