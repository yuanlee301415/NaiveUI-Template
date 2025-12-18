import { createLoadingBarGuard } from './loadingBar.js'
import { createTitleGuard } from './title.js'

export function setupRouterGuard(router) {
  createLoadingBarGuard(router)
  createTitleGuard(router)
}
