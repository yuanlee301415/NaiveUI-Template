/*
 * 权限指令
 * */

import type { ObjectDirective } from 'vue'
import type { RoleType } from '@/enum'
import { useAuthStore } from '@/stores'

export const permission: ObjectDirective<HTMLButtonElement, RoleType[]> = {
  mounted(el, binding) {
    const authStore = useAuthStore()
    const roles = authStore.user.roles ?? []
    const perms = binding.value ?? []
    if (!roles.some((role) => perms.includes(role))) {
      el.disabled = true
      el.classList.add('n-button--disabled')
    }
  },
}
