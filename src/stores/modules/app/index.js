/*
 * App store
 * */
import { defineStore } from 'pinia'
import { StoreId } from '@/enum/index.js'
import { ref } from 'vue'

export const useAppStore = defineStore(StoreId.App, () => {
  /**
   * 侧边栏折叠状态
   * @type {Ref<boolean>}
   */
  const siderCollapsed = ref(false)

  // 切换：侧边栏折叠状态
  function toggleSiderCollapsed() {
    siderCollapsed.value = !siderCollapsed.value
  }

  return {
    siderCollapsed,
    toggleSiderCollapsed,
  }
})
