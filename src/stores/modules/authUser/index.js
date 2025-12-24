/*
* 用户 Store
* */

import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { loginApi, getAuthUserApi } from '@/api/rights.js'
import { useRouteStore } from '@/stores/modules/route/index.js'

export const useAuthUserStore = defineStore('authUserStore', () => {
  const user = reactive({
    id: '',
    name: '',
    roles: []
  })

  const routeStore = useRouteStore()

  async function login({ name }) {
    const res = await loginApi(name)
    sessionStorage.setItem('token', res.token)
    return await getAuthUser()
  }

  async function logout() {
    console.warn('logout')
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
    Object.assign(user, { id: '', name: '', roles: [] })
  }

  return {
    user,
    login,
    logout,
    getAuthUser
  }
})
