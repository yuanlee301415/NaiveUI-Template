import request from '@/utils/request.js'

export function loginApi(name) {
  return request({
    url: `/login/${name}`,
  })
}

export function getCaptchaApi(mobile) {
  return request({
    url: `/captcha/${mobile}`,
  })
}

export function getAuthUserApi(token) {
  return request({
    url: `/authUser/${token}`,
  })
}
