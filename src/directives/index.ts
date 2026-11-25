/*
 * 指令
 * */

import type { App } from 'vue'
import { permission } from './modules/permission'

export function setupDirectives(app: App): void {
  app.directive('permission', permission)
}
