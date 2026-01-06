/*
 * 用户 Store
 * */

import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { StoreId } from '@/enum/index.js'
import { loginApi, getAuthUserApi } from '@/api/rights.js'
import { useRouteStore } from '@/stores/modules/route/index.js'
import { AuthUser } from '@/models/AuthUser.js'

export const useAuthStore = defineStore(StoreId.Auth, () => {
  const user = reactive(new AuthUser({
    id: '',
    login: '',
    name: '',
    roles: null
  }))

  const authStore = useAuthStore()
  const routeStore = useRouteStore()

  async function login({ name }) {
    const res = await loginApi(name)
    sessionStorage.setItem('token', res.token)
    routeStore.resetRoutes()
  }

  async function logout() {
    sessionStorage.removeItem('token')
    resetStore()
    routeStore.toLogin()
  }

  async function getAuthUser() {
    const token = sessionStorage.getItem('token')
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
    getAuthUser
  }
})
