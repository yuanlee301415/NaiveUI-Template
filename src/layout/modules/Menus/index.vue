<script setup>
import { useRouteStore } from '@/stores/modules/route/index.js'
import MenuItem from './MenuItem.vue'

defineOptions({ name: 'LayoutMenus' })

const routeStore = useRouteStore()
</script>

<template>
  <nav>
    <MenuItem v-for="menu of routeStore.menus" :key="menu.path" :menu="menu" />
  </nav>
</template>
