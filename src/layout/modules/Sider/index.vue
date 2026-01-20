<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSvgIcon } from '@/hooks/useSvgIcon.js'
import { router } from '@/router/index.js'
import { useRouteStore } from '@/stores/modules/route/index.js'

defineOptions({ name: 'LayoutSider' })

const routeStore = useRouteStore()
const route = useRoute()
const { SvgIconVNode } = useSvgIcon()

// 生成菜单选项
function genMenuOptions(menus, options = []) {
  for (const _ of menus) {
    const option = {
      key: _.path,
      label: _.title,
      icon: _.icon && SvgIconVNode({ icon: _.icon }),
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

function handleClickMenu(path) {
  router.push({ path })
}
</script>

<template>
  <n-menu :value="activeKey" :options="menuOptions" @update:value="handleClickMenu" />
</template>

<style scoped lang="less"></style>
