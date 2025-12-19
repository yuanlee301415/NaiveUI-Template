/*
* 用户 Store
* */

import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { loginApi, getAuthUserApi } from '@/api/rights.js'

export const useAuthUserStore = defineStore('authUserStore', () => {
  const user = reactive({
    id: '',
    name: '',
    roles: []
  })

  async function login({ name }) {
    const res = await loginApi(name)
    sessionStorage.setItem('token', res.token)
    await getAuthUser()
  }

  async function getAuthUser() {
    const token = sessionStorage.getItem('token')
    const { id, name, roles } = await getAuthUserApi(token)
    Object.assign(user, { id, name, roles })
    console.log('user:', user)
  }

  return {
    user,
    login,
    getAuthUser
  }
})
