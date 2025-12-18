/*
* 用户 Store
* */

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
  const user = ref(null)

  return {
    user
  }
})
