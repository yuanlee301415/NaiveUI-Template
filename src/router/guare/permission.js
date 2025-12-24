/*
* 用户权限
* */

import { useAuthStore } from '@/stores/modules/auth/index.js'
import { LOGIN_ROUTE_NAME } from '@/router/constants.js'

export function createPermissionGuard(router) {
  router.beforeEach(async (to, form, next) => {
    console.log('permission>to:', to)

    // 页面无权限限制
    if (!(to.meta && to.meta.roles)) {
      console.warn('页面无权限限制')
      return next()
    }

    const token = sessionStorage.getItem('token')
    const authStore = useAuthStore()

    // 未授权
    if (!token) {
      console.warn('未授权')
      return next({ name: LOGIN_ROUTE_NAME })
    }

    if (!authStore.user.id) {
      await authStore.getAuthUser()
    }

    console.warn('已授权')
    return next()
  })
}
