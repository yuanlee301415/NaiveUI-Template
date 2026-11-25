import type { Router } from 'vue-router'
import { createLoadingBarGuard } from './loadingBar'
import { createTitleGuard } from './title'
import { createPermissionGuard } from './permission'

export function setupRouterGuard(router: Router): void {
  createPermissionGuard(router)
  createLoadingBarGuard(router)
  createTitleGuard(router)
}
