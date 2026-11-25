<script setup lang="ts">
import { computed } from 'vue'
import ButtonIcon from '@/components/ButtonIcon/index.vue'

defineOptions({ name: 'MenuToggler' })

const CONFIG = {
  true: {
    icon: 'i-line-md:menu-fold-right',
    tip: '展开菜单',
  },

  false: {
    icon: 'i-line-md:menu-fold-left',
    tip: '折叠菜单',
  },
} as const

const props = withDefaults(
  defineProps<{
    collapsed?: boolean
  }>(),
  {
    collapsed: false,
  },
)

const config = computed(() => CONFIG[String(props.collapsed) as 'true' | 'false'])
</script>

<template>
  <button-icon :key="String(collapsed)" :tooltip-content="config.tip" tooltip-placement="bottom-start">
    <SvgIcon :icon="config.icon" />
  </button-icon>
</template>

<style scoped lang="less"></style>
