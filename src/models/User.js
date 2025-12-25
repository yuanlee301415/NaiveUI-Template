/*
* User model
* */

export class User {
  /**
   * @type {string}
   */
  id

  /**
   * 显示名称
   * @type {string}
   */
  name

  /**
   * 角色
   * @type {string[]}
   */
  roles

  /**
   * @param {User} _
   */
  constructor(_) {
    const {id, name, roles} = { ..._ }
    this.id = id
    this.name = name
    this.roles = roles
  }

  /**
   * 批量实例化
   * @param {Array} [list]
   * @return {User[]|*}
   */
  from(list) {
    return list?.map(_ => new this(_))
  }
}
