/*
* 用户 Store
* */

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserApi } from '@/api/rights.js'

export const useAuthUserStore = defineStore('authUserStore', () => {
  const user = ref(null)

  async function login({ name }) {
    const user = await getUserApi(name)
    console.log('user:', user)
    user.value = user
  }

  return {
    user,
    login
  }
})
