/*
 * 角色
 * */

export type RoleType = 'SUPER' | 'ADMIN' | 'USER'

interface RoleEnum {
  /** 超级管理员 */
  readonly Super: 'SUPER'
  /** 管理员 */
  readonly Admin: 'ADMIN'
  /** 用户 */
  readonly User: 'USER'
  [Symbol.iterator](): IterableIterator<RoleType>
}

/**
 * 角色 Enum
 */
export const Role: RoleEnum = {
  Super: 'SUPER',

  Admin: 'ADMIN',

  User: 'USER',

  *[Symbol.iterator]() {
    yield this.User
    yield this.Admin
    yield this.Super
  },
}
