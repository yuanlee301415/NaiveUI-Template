/*
* 路由 Store
* */

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { basic } from '@/router/routes'

export const useRouteStore = defineStore('routeStore', () => {
  const menus = ref([])

  init()

  return {
    menus
  }

  function init() {
    menus.value = getMenus(basic)
  }

  function getMenus(routes, path, depth = 1, result = []) {
    for (const route of routes) {
      if (!(route.meta && route.meta.title)) continue
      const menu = {
        path: path ? path + '/' + route.path : route.path,
        meta: route.meta,
        depth
      }
      result.push(menu)

      if (!route.children) continue
      const children = getMenus(route.children, menu.path, depth + 1)
      menu.children = children.length ? children : null
    }
    return result
  }
})
