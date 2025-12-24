/*
* 路由 Store
* */

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { basic } from '@/router/routes'
import { LOGIN_ROUTE_NAME } from '@/router/constants.js'

export const useRouteStore = defineStore('routeStore', () => {
  const route = useRoute()
  const router = useRouter()
  const menus = ref([])

  init()

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

  function toLogin() {
    if (!(route.meta && route.meta.roles)) return
    router.push({ name: LOGIN_ROUTE_NAME, query: { redirect: route.path } })
  }

  return {
    menus,
    toLogin
  }
})
