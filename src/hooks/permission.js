/*
 * 权限 Hook
 * */

import { useAuthStore } from '@/stores/index.js'

export function usePermission() {
  const authStore = useAuthStore()

  /**
   * 判断是否有权限
   * - 无权限，则判断为有权限
   * - 用户角色是否包含任一指定角色
   * @param {string[]} perms
   * @return {boolean}
   */
  function hasPermission(perms) {
    if (!perms?.length) return true
    return somePermission(perms)
  }

  /**
   * 用户角色是否包含任一指定角色
   * @param {string[]} perms 权限（角色）列表
   * @return boolean
   */
  function somePermission(perms) {
    return !!authStore.user.roles?.some((role) => perms.includes(role))
  }

  return {
    hasPermission,
  }
}
