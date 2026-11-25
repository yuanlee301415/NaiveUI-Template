/*
 * 用户
 * */

import formatDate from '@/utils/formatDate'
import type { GenderValue, UsingStatusValue } from '@/enum'

const LOGIN_LABEL = '用户名'
const NAME_LABEL = '昵称'
const PHONE_LABEL = '手机'
const EMAIL_LABEL = '邮箱'
const GENDER_LABEL = '性别'
const STATUS_LABEL = '状态'
const CREATE_TIME_LABEL = '创建时间'

export class User {
  /** 用户 ID */
  id: string

  /** 用户名 */
  login: string

  /** 昵称 */
  name: string

  /** 业务角色（区别于权限角色 Role） */
  roles: string[] | null

  /** 手机 */
  phone: string

  /** 邮箱 */
  email: string

  /** 性别 */
  gender: GenderValue | null

  /** 状态 */
  status: UsingStatusValue | null

  /** 创建时间（时间戳） */
  createTime?: number

  constructor(_: Partial<User> = {}) {
    const { id = '', login = '', name = '', roles = null, phone = '', email = '', gender = null, status = null, createTime } = _
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

  get createTimeString(): string {
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
   */
  static from(list?: Partial<User>[]): User[] | undefined {
    return list?.map((_) => new User(_))
  }
}

/**
 * 用户搜索条件
 */
export class UserParams {
  login: string
  name: string
  phone: string
  email: string
  gender: GenderValue | null
  status: UsingStatusValue | null

  constructor(_: Partial<Pick<User, 'login' | 'name' | 'phone' | 'email' | 'gender' | 'status'>> = {}) {
    const { login = '', name = '', phone = '', email = '', gender = null, status = null } = _
    this.login = login
    this.name = name
    this.phone = phone
    this.email = email
    this.gender = gender
    this.status = status
  }
}
