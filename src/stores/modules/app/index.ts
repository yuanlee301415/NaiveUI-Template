/*
 * App store
 * */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { StoreId } from '@/enum'

export const useAppStore = defineStore(StoreId.App, () => {
  /**
   * 侧边栏折叠状态
   */
  const siderCollapsed = ref<boolean>(false)

  // 切换：侧边栏折叠状态
  function toggleSiderCollapsed(): void {
    siderCollapsed.value = !siderCollapsed.value
  }

  return {
    siderCollapsed,
    toggleSiderCollapsed,
  }
})
