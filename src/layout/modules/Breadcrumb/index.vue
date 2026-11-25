<!--
面包屑 组件
-->
<script setup lang="ts">
import type { DropdownOption } from 'naive-ui'
import { computed, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { Breadcrumb } from './shared'

defineOptions({ name: 'LayoutBreadcrumb' })

const currentRoute = useRoute()
const router = useRouter()

/**
 * 面包屑
 */
const breadcrumbs = computed(() => Breadcrumb.genBreadcrumbsByRoutes(currentRoute.matched))

/**
 * 面包屑子项 -> 下拉菜单选项
 */
const breadcrumbOptions = computed(() =>
  breadcrumbs.value.map((item) => ({
    ...item,
    options: item.children?.map<DropdownOption>((child) => ({
      key: String(child.key ?? child.path),
      label: child.title,
      icon: child.icon ? () => h(SvgIcon, { icon: child.icon }) : undefined,
    })),
  })),
)

/**
 * 面包屑 跳转
 */
function handleSelect(key: string | number): void {
  router.push({ name: String(key) })
}
</script>

<template>
  <n-breadcrumb>
    <n-breadcrumb-item v-for="item of breadcrumbOptions" :key="item.key">
      <n-dropdown v-if="item.options" :options="item.options" @select="handleSelect">
        <span>
          <SvgIcon v-if="item.icon" :icon="item.icon" class="text-xl" />
          {{ item.title }}
        </span>
      </n-dropdown>
      <span v-else>
        <SvgIcon v-if="item.icon" :icon="item.icon" class="text-xl" />
        {{ item.title }}
      </span>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<style scoped lang="less"></style>
