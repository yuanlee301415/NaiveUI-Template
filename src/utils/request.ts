/*
 * 接口请求
 * */

import axios from 'axios'
import type { AxiosError, AxiosRequestConfig } from 'axios'

/** 不弹出错误提示的接口 */
const NOT_TOAST_URLS: RegExp[] = [new RegExp('/login')]

/** 接口返回的错误结构 */
export interface ApiErrorData {
  message?: string
}

/** 已解包响应体的请求方法 */
export interface RequestInstance {
  <T = unknown>(config: AxiosRequestConfig): Promise<T>
}

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 1000 * 60 * 5,
})

service.interceptors.response.use(
  (response) => {
    // 流式文件下载，直接返回响应体
    if (response.config.responseType === 'blob') {
      return response
    }

    return response.data
  },
  (error: AxiosError<ApiErrorData>) => {
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

    if (NOT_TOAST_URLS.find((reg) => reg.test(error.config?.url ?? ''))) {
      return Promise.reject(error)
    }

    window.$message.error(error.response?.data?.message || '系统繁忙，请稍后再试！')
    return Promise.reject(error)
  },
)

// 重新登录
function reLogin(): void {}

export default service as unknown as RequestInstance
