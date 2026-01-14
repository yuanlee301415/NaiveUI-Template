/*
* 用户 API
* */

import request from '@/utils/request.js'

/**
 * @param {UserParams & {page: number, size: number}} _
 * @return {Promise<{data: User[], pages: number, items: number}>}
 */
export function getUsersApi({ login, name, phone, email, gender, status, page = 1, size = 10, sort = '-createTime' } = {}) {
  return request({
    url: `/users`,
    params: {
      login, name, phone, email, gender, status,
      _page: page,
      _per_page: size,
      _sort: sort
    }
  })
}

/**
 * 新增用户
 * @param {Omit<UserParams, 'login'>} _
 * @return {Promise<User>}
 */
export function createUserApi({ name, phone, email, gender, status }) {
  return request({
    url: `/users`,
    method: 'post',
    data: {
      name, phone, email, gender, status, createTime: Date.now()
    }
  })
}

/**
 * 更新用户
 * @param {Omit<UserParams, 'login'> & {id: User.id}} _
 * @return {Promise<User>}
 */
export function updateUserApi({ id, name, phone, email, gender, status }) {
  return request({
    url: `/users/${id}`,
    method: 'patch',
    data: {
      name, phone, email, gender, status
    }
  })
}

/**
 * 删除用户
 * @param {User.id} id
 * @return {Promise<User>}
 */
export function deleteUserApi(id) {
  return request({
    url: `/users/${id}`,
    method: 'delete'
  })
}

/**
 * 批量删除用户
 * @param {User.id[]} ids
 * @return {Promise<User[]>}
 */
export function batchDeleteUserApi(ids = []) {
  return Promise.all(ids.map(id => deleteUserApi(id)))
}
