/*
 * 用户角色
 * */

export const Role = {
  // 超级管理员
  Super: 'SUPER',

  // 管理员
  Admin: 'ADMIN',

  // 用户
  User: 'USER',

  * [Symbol.iterator]() {
    yield this.User
    yield this.Admin
    yield this.Super
  }
}
