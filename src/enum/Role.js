/*
 * 角色
 * */

/**
 * 角色 Enum
 * - Super: 'SUPER'
 * - Admin: 'ADMIN'
 * - User: 'USER'
 * @enum {string}
 */
export const Role = {
  // 超级管理员
  Super: 'SUPER',

  // 管理员
  Admin: 'ADMIN',

  // 用户
  User: 'USER',

  *[Symbol.iterator]() {
    yield this.User
    yield this.Admin
    yield this.Super
  },
}
