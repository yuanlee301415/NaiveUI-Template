/*
 * 权限指令
 * */

import { useAuthStore } from '@/stores/index.js'

export const permission = {
  mounted(el, binding) {
    const authStore = useAuthStore()
    const { roles } = authStore.user
    const { value } = binding
    if (!roles.some((role) => value?.includes(role))) {
      el.disabled = true
      el.classList.add('n-button--disabled')
    }
  },
}
