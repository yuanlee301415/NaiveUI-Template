/*
 * 接口请求
 * */

import axios from 'axios'

const NOT_TOAST_URLS = [new RegExp('/login')]

// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 1000 * 60 * 5,
})

// response interceptor
service.interceptors.response.use(
  (response) => {
    // 流式文件下载，直接返回响应体
    if (response.config.responseType === 'blob') {
      return response
    }

    return response.data
  },
  (error) => {
    console.error('[axios] response error:\n', error)

    if (error.response) {
      const res = error.response
      // 用户会话已失效
      if (res.status === 401) {
        reLogin()
        return Promise.reject(error)
      }
    }

    // 取消请求
    if (error.code === 'ERR_CANCELED') {
      return Promise.reject(error)
    }

    // 请求超时
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      window.$message.error('请求超时，请稍后再试！')
      return Promise.reject(error)
    }

    if (NOT_TOAST_URLS.find((reg) => reg.test(error.config.url))) {
      return Promise.reject(error)
    }

    window.$message.error(error.response?.data?.message || '系统繁忙，请稍后再试！')
    return Promise.reject(error)
  },
)

// 重新登录
function reLogin() {}

export default service
