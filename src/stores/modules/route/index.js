/*
 * 路由 Store
 * */

import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

import { router } from '@/router'
import { StoreId } from '@/enum/index.js'
import { dynamicRoutes, staticRoutes } from '@/router/routes'
import { HOME_ROUTE_NAME, LOGIN_ROUTE_NAME } from '@/router/constants.js'
import { filterAsyncRoutes, genMenus } from '../../shared'

/**
 * 添加的动态路由
 * @type {RouteLocation[]}
 */
let addRoutes = []

/**
 * 添加的动态路由记录
 * @type {Function[]}
 */
const removeRouteFns = []


export const useRouteStore = defineStore(StoreId.Route, () => {
  const route = useRoute()
  const menus = ref([])

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

  /**
   * 添加动态路由
   * @param {string[]} roles 用户角色列表
   */
  function addDynamicRoutes(roles) {
    addRoutes = filterAsyncRoutes(roles, dynamicRoutes)
    // console.log('addDynamicRoutes>addRoutes:', addRoutes)
    addRoutes.forEach(route => {
      removeRouteFns.push(router.addRoute(route))
    })
    getMenus()
    // console.log('addDynamicRoutes>routes:', router.getRoutes())
  }

  // 清空添加的动态路由
  function resetRoutes() {
    while (removeRouteFns.length) {
      removeRouteFns.pop()?.()
    }
  }

  /**
   * 获取菜单列表
   */
  function getMenus() {
    menus.value = genMenus([...staticRoutes, ...addRoutes])
  }

  return {
    menus,
    toLogin,
    // toHome,
    redirectFormLogin,
    addDynamicRoutes,
    resetRoutes
  }
})
