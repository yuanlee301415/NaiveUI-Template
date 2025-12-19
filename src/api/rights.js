import request from '@/utils/request.js'

export function loginApi(id) {
  return request({
    url: `/login/${id}`
  })
}

export function getAuthUserApi(token) {
  return request({
    url: `/authUser/${token}`
  })
}
