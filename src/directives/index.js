/*
 * 指令
 * */

import { permission } from './modules/permission.js'

export function setupDirectives(app) {
  app.directive('permission', permission)
}
