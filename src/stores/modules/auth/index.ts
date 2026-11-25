/*
 * 用户 Store
 * */

import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { StoreId } from '@/enum/index'
import { loginApi, getAuthUserApi } from '@/api/rights'
import { useRouteStore } from '@/stores/index'
import { AuthUser } from '@/models/AuthUser'
import { getAuthToken, setAuthToken, removeAuthToken } from '@/utils/authToken'

export interface LoginPayload {
  login: string
}

interface AuthStoreSetup {
  user: AuthUser
  login(payload: LoginPayload): Promise<void>
  logout(): Promise<void>
  getAuthUser(): Promise<AuthUser>
  resetStore(): void
}

export const useAuthStore = defineStore(StoreId.Auth, (): AuthStoreSetup => {
  const user = reactive(
    new AuthUser({
      id: '',
      name: '',
      roles: null,
    }),
  )

  const authStore = useAuthStore()
  const routeStore = useRouteStore()

  async function login({ login }: LoginPayload): Promise<void> {
    const res = await loginApi(login)
    setAuthToken(res.token)
    routeStore.resetRoutes()
  }

  async function logout(): Promise<void> {
    removeAuthToken()
    resetStore()
    routeStore.toLogin()
  }

  async function getAuthUser(): Promise<AuthUser> {
    const token = getAuthToken()
    Object.assign(user, new AuthUser(await getAuthUserApi(token)))
    console.log('getAuthUser>user:', user)
    return user
  }

  function resetStore(): void {
    authStore.$reset()
  }

  return {
    user,
    login,
    logout,
    getAuthUser,
    resetStore,
  }
})
