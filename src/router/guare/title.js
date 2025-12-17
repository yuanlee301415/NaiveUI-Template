
export function createTitleGuard(router) {
  router.afterEach(to => {
    const {title} = to.meta
    if (!title) return
    document.title = title
  })
}
