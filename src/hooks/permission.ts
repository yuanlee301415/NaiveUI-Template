/*
 * 权限 Hook
 * */

import { useAuthStore } from '@/stores/index'
import type { RoleType } from '@/enum'

export function usePermission() {
  const authStore = useAuthStore()

  /**
   * 判断是否有权限
   * - 无权限，则判断为有权限
   * - 用户角色是否包含任一指定角色
   */
  function hasPermission(perms?: RoleType[]): boolean {
    if (!perms?.length) return true
    return somePermission(perms)
  }

  /**
   * 用户角色是否包含任一指定角色
   * @param perms 权限（角色）列表
   */
  function somePermission(perms: RoleType[]): boolean {
    const roles = authStore.user.roles ?? []
    return roles.some((role) => perms.includes(role))
  }

  return {
    hasPermission,
  }
}
