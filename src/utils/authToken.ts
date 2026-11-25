/*
 * 设置、获取、删除 用户认证 Token
 * */

const key = 'access_token'

export function getAuthToken(): string | null {
  return sessionStorage.getItem(key)
}

export function setAuthToken(token: string): void {
  sessionStorage.setItem(key, token)
}

export function removeAuthToken(): void {
  sessionStorage.removeItem(key)
}
