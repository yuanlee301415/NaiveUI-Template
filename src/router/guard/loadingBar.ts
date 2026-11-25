/*
 * 页面加载进度条
 * */

import type { Router } from 'vue-router'

export function createLoadingBarGuard(router: Router): void {
  router.beforeEach(() => {
    window.$loading.start()
  })

  router.afterEach(() => {
    window.$loading.finish()
  })
}
