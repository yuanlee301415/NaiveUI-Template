/*
* 用户权限
* */

import {useUserStore} from '@/stores/modules/user'
import {LOGIN_ROUTE_NAME} from '@/router/constants.js'

export function createPermissionGuard(router) {
  router.beforeEach(async (to, form, next) => {
    console.log('permission>to:', to)

    // 页面无权限限制
    if (!(to.meta && to.meta.roles)) {
      console.warn('页面无权限限制')
      return next()
    }

    // 未授权
    const userStore = useUserStore()
    if (!userStore.user) {
      console.warn('未授权')
      return next({ name: LOGIN_ROUTE_NAME })
    }

    console.warn('已授权')
    return next()
  })
}
