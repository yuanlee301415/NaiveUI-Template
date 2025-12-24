/*
* 用户 Store
* */

import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { loginApi, getAuthUserApi } from '@/api/rights.js'
import { useRouteStore } from '@/stores/modules/route/index.js'

export const useAuthStore = defineStore('authStore', () => {
  const user = reactive({
    id: '',
    name: '',
    roles: []
  })

  const authStore = useAuthStore()
  const routeStore = useRouteStore()

  async function login({ name }) {
    const res = await loginApi(name)
    sessionStorage.setItem('token', res.token)
    return await getAuthUser()
  }

  async function logout() {
    sessionStorage.removeItem('token')
    resetStore()
    routeStore.toLogin()
  }

  async function getAuthUser() {
    const token = sessionStorage.getItem('token')
    const { id, name, roles } = await getAuthUserApi(token)
    Object.assign(user, { id, name, roles })
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
