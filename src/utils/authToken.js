/*
* 设置、获取、删除 用户认证 Token
* */

const key = 'access_token'

export function getAuthToken() {
  return sessionStorage.getItem(key)
}

export function setAuthToken(token) {
  sessionStorage.setItem(key, token)
}

export function removeAuthToken() {
  sessionStorage.removeItem(key)
}
