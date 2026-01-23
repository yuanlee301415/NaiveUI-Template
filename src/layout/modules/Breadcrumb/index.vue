<!--
面包屑 组件
-->
<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { Breadcrumb } from './shared.js'

defineOptions({ name: 'LayoutBreadcrumb' })

const currentRoute = useRoute()
const router = useRouter()

/**
 * 面包屑
 * @type {ComputedRef<Breadcrumb[]>}
 */
const breadcrumbs = computed(() => Breadcrumb.genBreadcrumbsByRoutes(currentRoute.matched))

/**
 * 面包屑 跳转
 * @param {Breadcrumb.key} key
 */
function handleSelect(key) {
  router.push({ name: key })
}
</script>

<template>
  <n-breadcrumb>
    <n-breadcrumb-item v-for="item of breadcrumbs" :key="item.key">
      <n-dropdown v-if="item.children" :options="item.children" @select="handleSelect">
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
