/*
 * 用户
 * */

export class User {
  /**
   * @type {string}
   */
  id

  /**
   * 登录名
   * @type {string}
   */
  login

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
   * @type {string}
   */
  phone

  /**
   * @type {string}
   */
  email

  /**
   * @type {1|2}
   */
  gender

  /**
   * @type {0|1}
   */
  status

  /**
   * 创建时间戳
   * @type {number}
   */
  createTime

  /**
   * @param {User} _
   */
  constructor(_) {
    const { id, login, name, roles, phone, email, gender, status, createTime } = { ..._ }
    this.id = id
    this.login = login
    this.name = name
    this.roles = roles
    this.phone = phone
    this.email = email
    this.gender = gender
    this.status = status
    this.createTime = createTime
  }

  /**
   * 批量实例化
   * @param {Array} [list]
   * @return {User[]|*}
   */
  from(list) {
    return list?.map((_) => new this(_))
  }
}
