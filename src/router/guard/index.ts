import { createLoadingBarGuard } from './loadingBar'
import { createTitleGuard } from './title'
import { createPermissionGuard } from './permission'

export function setupRouterGuard(router) {
  createPermissionGuard(router)
  createLoadingBarGuard(router)
  createTitleGuard(router)
}
