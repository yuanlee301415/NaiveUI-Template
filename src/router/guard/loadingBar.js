/*
 * 页面加载进度条
 * */

export function createLoadingBarGuard(router) {
  router.beforeEach(() => {
    window.$loading.start()
  })

  router.afterEach(() => {
    window.$loading.finish()
  })
}
