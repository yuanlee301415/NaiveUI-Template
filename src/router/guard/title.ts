import type { Router } from 'vue-router'

export function createTitleGuard(router: Router): void {
  router.afterEach((to) => {
    const { title } = to.meta
    if (!title) return
    document.title = title
  })
}
