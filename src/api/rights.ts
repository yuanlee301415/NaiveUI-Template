/*
 * 权限 API
 * */

import request from '@/utils/request'
import type { RoleType } from '@/enum'

export interface LoginResult {
  id: string
  token: string
}

export interface AuthUserData {
  id: string
  login: string
  name: string
  roles: RoleType[] | null
}

export interface CaptchaResult {
  id: string
  code: string
  name: string
}

export function loginApi(name: string): Promise<LoginResult> {
  return request<LoginResult>({
    url: `/login/${name}`,
  })
}

export function getCaptchaApi(mobile: string): Promise<CaptchaResult> {
  return request<CaptchaResult>({
    url: `/captcha/${mobile}`,
  })
}

export function getAuthUserApi(token: string | null): Promise<AuthUserData> {
  return request<AuthUserData>({
    url: `/authUser/${token ?? ''}`,
  })
}
