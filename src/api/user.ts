/*
 * 用户 API
 * */

import request from '@/utils/request'
import type { User, UserParams } from '@/models/index'

export interface UserListResult {
  data: Partial<User>[]
  pages: number
  items: number
}

export interface GetUsersParams extends Partial<UserParams> {
  page?: number
  size?: number
  sort?: string
}

export function getUsersApi({
  login,
  name,
  phone,
  email,
  gender,
  status,
  page = 1,
  size = 10,
  sort = '-createTime',
}: GetUsersParams = {}): Promise<UserListResult> {
  return request<UserListResult>({
    url: `/users`,
    params: {
      login,
      name,
      phone,
      email,
      gender,
      status,
      _page: page,
      _per_page: size,
      _sort: sort,
    },
  })
}

/**
 * 新增用户
 */
export function createUserApi({ name, phone, email, gender, status }: Omit<Partial<UserParams>, 'login'>): Promise<Partial<User>> {
  return request<Partial<User>>({
    url: `/users`,
    method: 'post',
    data: {
      name,
      phone,
      email,
      gender,
      status,
      createTime: Date.now(),
    },
  })
}

/**
 * 更新用户
 */
export function updateUserApi({
  id,
  name,
  phone,
  email,
  gender,
  status,
}: Omit<Partial<UserParams>, 'login'> & { id: string }): Promise<Partial<User>> {
  return request<Partial<User>>({
    url: `/users/${id}`,
    method: 'patch',
    data: {
      name,
      phone,
      email,
      gender,
      status,
    },
  })
}

/**
 * 删除用户
 */
export function deleteUserApi(id: string): Promise<Partial<User>> {
  return request<Partial<User>>({
    url: `/users/${id}`,
    method: 'delete',
  })
}

/**
 * 批量删除用户
 */
export function batchDeleteUserApi(ids: string[] = []): Promise<Partial<User>[]> {
  return Promise.all(ids.map((id) => deleteUserApi(id)))
}
