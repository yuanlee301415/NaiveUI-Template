/*
 * 路由 Store
 * */

import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'

import { router } from '@/router'
import { StoreId } from '@/enum/index.js'
import { dynamicRoutes, staticRoutes } from '@/router/routes'
import { HOME_ROUTE_NAME, LOGIN_ROUTE_NAME } from '@/router/constants.js'

let addRoutes = []

const removeRouteFns = []

const hasPermission = (roles, route) => {
  if (!route.meta?.roles) return true
  return route.meta.roles.some((_) => roles.includes(_))
}

const filterAsyncRoutes = (roles, routes) => {
  function _(routes) {
    const ret = []
    if (!routes) return
    for (const route of routes) {
      const temp = { ...route, children: null }
      if (hasPermission(roles, route)) {
        temp.children = _(route.children)
        ret.push(temp)
      }
    }
    return ret
  }

  return _(routes)
}

const genMenus = (routes, path = '', depth = 1, result = []) => {
  for (const route of routes) {
    if (!route?.meta?.title) continue
    const menu = {
      path: path ? path + '/' + route.path : route.path,
      meta: route.meta,
      depth
    }
    result.push(menu)

    if (!route.children) continue
    const children = genMenus(route.children, menu.path, depth + 1)
    menu.children = children.length ? children : null
  }
  return result
}

export const useRouteStore = defineStore(StoreId.Route, () => {
  const route = useRoute()

  function toLogin() {
    router.push({ name: LOGIN_ROUTE_NAME, query: { redirect: route.path } })
  }

  function toHome() {
    router.push({ name: HOME_ROUTE_NAME })
  }

  function redirectFormLogin() {
    const { redirect } = route.query
    if (redirect) {
      router.push(redirect)
    } else {
      toHome()
    }
  }

  function addDynamicRoutes(roles) {
    addRoutes = filterAsyncRoutes(roles, dynamicRoutes)
    // console.log('addDynamicRoutes>addRoutes:', addRoutes)
    addRoutes.forEach(route => {
      removeRouteFns.push(router.addRoute(route))
    })
    // console.log('addDynamicRoutes>routes:', router.getRoutes())
  }

  function resetRoutes() {
    while (removeRouteFns.length) {
      removeRouteFns.pop()?.()
    }
  }

  function getMenus() {
    return genMenus([...staticRoutes, ...addRoutes])
  }

  return {
    getMenus,
    toLogin,
    // toHome,
    redirectFormLogin,
    addDynamicRoutes,
    resetRoutes
  }
})
