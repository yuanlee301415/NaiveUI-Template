import { createLoadingBarGuard } from './loadingBar.js'
import { createTitleGuard } from './title.js'
import { createPermissionGuard } from './permission.js'

export function setupRouterGuard(router) {
  createPermissionGuard(router)
  createLoadingBarGuard(router)
  createTitleGuard(router)
}
