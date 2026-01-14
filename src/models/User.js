/*
 * 用户
 * */

import formatDate from '@/utils/formatDate.js'

const LOGIN_LABEL = '登录名'
const NAME_LABEL = '显示名称'
const PHONE_LABEL = '手机'
const EMAIL_LABEL = '邮箱'
const GENDER_LABEL = '性别'
const STATUS_LABEL = '状态'
const CREATE_TIME_LABEL = '创建时间'

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
   * @type {Role[]}
   */
  roles

  /**
   * 手机
   * @type {string}
   */
  phone

  /**
   * 邮箱
   * @type {string}
   */
  email

  /**
   * 性别
   * @type {Gender}
   */
  gender

  /**
   * 状态
   * @type {UsingStatus}
   */
  status

  /**
   * 创建时间
   * @type {number}
   */
  createTime

  /**
   * @param {User} _
   */
  constructor(_) {
    const { id, login = '', name = '', roles = null, phone = '', email = '', gender = null, status = null, createTime } = { ..._ }
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

  get createTimeString() {
    return formatDate(this.createTime)
  }

  static LOGIN_LABEL = LOGIN_LABEL
  static NAME_LABEL = NAME_LABEL
  static PHONE_LABEL = PHONE_LABEL
  static EMAIL_LABEL = EMAIL_LABEL
  static GENDER_LABEL = GENDER_LABEL
  static STATUS_LABEL = STATUS_LABEL
  static CREATE_TIME_LABEL = CREATE_TIME_LABEL

  /**
   * 批量实例化
   * @param {Array} [list]
   * @return {User[]|*}
   */
  static from(list) {
    return list?.map((_) => new this(_))
  }

  /**
   * 搜索条件 Model
   * @type {UserParams}
   */
  static UserParams = class extends this {
    constructor(_) {
      super(_)
      delete this.id
      delete this.roles
      delete this.createTime
    }
  }
}
