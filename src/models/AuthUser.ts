/*
 * 认证用户
 * */

import type { RoleType } from '@/enum'

export class AuthUser {
  /** 用户 ID（即 token） */
  id: string

  /** 显示名称 */
  name: string

  /** 角色 */
  roles: RoleType[] | null

  constructor(_: Partial<AuthUser> = {}) {
    const { id = '', name = '', roles = null } = _
    this.id = id
    this.name = name
    this.roles = roles
  }

  /**
   * 批量实例化
   */
  static from(list?: Partial<AuthUser>[]): AuthUser[] | undefined {
    return list?.map((_) => new AuthUser(_))
  }
}
