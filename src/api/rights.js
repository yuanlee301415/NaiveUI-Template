import request from '@/utils/request.js'

export function getUserApi(id) {
  return request({
    url: `/login/${id}`
  })
}
