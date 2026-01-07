/*
 * 用户 Store
 * */

import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { StoreId } from '@/enum/index.js'
import { loginApi, getAuthUserApi } from '@/api/rights.js'
import { useRouteStore } from '@/stores/modules/route/index.js'
import { AuthUser } from '@/models/AuthUser.js'
import { getAuthToken, setAuthToken, removeAuthToken } from '@/utils/authToken.js'

export const useAuthStore = defineStore(StoreId.Auth, () => {
  const user = reactive(new AuthUser({
    id: '',
    login: '',
    name: '',
    roles: null
  }))

  const authStore = useAuthStore()
  const routeStore = useRouteStore()

  async function login({ login }) {
    const res = await loginApi(login)
    setAuthToken(res.token)
    routeStore.resetRoutes()
  }

  async function logout() {
    removeAuthToken()
    resetStore()
    routeStore.toLogin()
  }

  async function getAuthUser() {
    const token = getAuthToken()
    Object.assign(user, new AuthUser(await getAuthUserApi(token)))
    console.log('getAuthUser>user:', user)
    return user
  }

  function resetStore() {
    authStore.$reset()
  }

  return {
    user,
    login,
    logout,
    getAuthUser,
    resetStore
  }
})
