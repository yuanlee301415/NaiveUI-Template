/*
 * 角色
 * */

const SUPER = 'SUPER'
const ADMIN = 'ADMIN'
const USER = 'USER'

export type RoleType = typeof SUPER | typeof ADMIN | typeof USER

interface RoleEnum {
  /** 超级管理员 */
  readonly Super: typeof SUPER
  /** 管理员 */
  readonly Admin: typeof ADMIN
  /** 用户 */
  readonly User: typeof USER

  [Symbol.iterator](): IterableIterator<RoleType>
}

/**
 * 角色 Enum
 */
export const Role: RoleEnum = {
  Super: SUPER,

  Admin: ADMIN,

  User: USER,

  *[Symbol.iterator]() {
    yield this.User
    yield this.Admin
    yield this.Super
  },
}
