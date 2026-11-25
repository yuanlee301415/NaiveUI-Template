import { beforeEach, describe, expect, it } from 'vitest'

import { getAuthToken, removeAuthToken, setAuthToken } from '@/utils/authToken'

describe('authToken', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('写入后可读取', () => {
    setAuthToken('token-1')
    expect(getAuthToken()).toBe('token-1')
  })

  it('未写入时返回 null', () => {
    expect(getAuthToken()).toBeNull()
  })

  it('删除后返回 null', () => {
    setAuthToken('token-1')
    removeAuthToken()
    expect(getAuthToken()).toBeNull()
  })
})
