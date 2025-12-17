<script setup>
import {routes} from '@/router/modules'
import MenuItem from './MenuItem.vue'

const menus = getMenus(routes)

function getMenus(routes, path, depth = 1, result = []) {
  for (const route of routes) {
    if (!route.name || !(route.meta && route.meta.title)) continue
    const menu =  {
      name: route.name,
      path: path ? path + '/' + route.path : route.path,
      meta: route.meta,
      depth
    }
    result.push(menu)

    if (!route.children) continue
    const children = getMenus(route.children, menu.path, depth + 1)
    menu.children = children.length ? children: null
  }
  return result
}
</script>

<template>
  <nav>
    <MenuItem v-for="menu of menus" :key="menu.name" :menu="menu"/>
  </nav>
</template>

<style scoped lang="less">

</style>
