<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { MenuOption } from 'naive-ui'
import { useSvgIcon } from '@/hooks/index'
import { router } from '@/router/index'
import { useRouteStore, useAppStore } from '@/stores/index'
import type { Menu } from '@/models/index'

defineOptions({ name: 'LayoutSider' })

const routeStore = useRouteStore()
const route = useRoute()
const { SvgIconVNode } = useSvgIcon()
const appStore = useAppStore()

// 生成菜单选项
function genMenuOptions(menus: Menu[], options: MenuOption[] = []): MenuOption[] {
  for (const _ of menus) {
    const option: MenuOption = {
      key: _.path,
      label: _.title,
      icon: _.icon ? SvgIconVNode({ icon: _.icon }) : undefined,
    }
    if (_.children?.length) {
      option.children = genMenuOptions(_.children)
    }
    options.push(option)
  }
  return options
}

// 菜单选项
const menuOptions = computed(() => genMenuOptions(routeStore.menus))

// 当前选中菜单
const activeKey = computed(() => route.path)

function handleClickMenu(path: string): void {
  router.push({ path })
}
</script>

<template>
  <aside :class="{ collapsed: appStore.siderCollapsed }" class="transition-all-300">
    <n-menu
      :value="activeKey"
      :options="menuOptions"
      :collapsed="appStore.siderCollapsed"
      :collapsed-width="60"
      :collapsed-icon-size="30"
      @update:value="handleClickMenu"
    />
  </aside>
</template>

<style scoped lang="less">
aside {
  width: calc(var(--sider-width) - 10px);

  &.collapsed {
    width: 60px;
  }
}
</style>
