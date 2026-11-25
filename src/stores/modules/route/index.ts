/*
 * 路由 Store
 * */

import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { Ref } from 'vue'
import { ref } from 'vue'

import { router } from '@/router'
import { StoreId } from '@/enum/index'
import type { RoleType } from '@/enum/index'
import { dynamicRoutes, staticRoutes } from '@/router/routes'
import { HOME_ROUTE_NAME, LOGIN_ROUTE_NAME } from '@/router/constants'
import { filterAsyncRoutes, genMenus } from '../../shared'
import type { Menu } from '@/models/index'

/**
 * 添加的动态路由
 */
let addRoutes: RouteRecordRaw[] = []

/**
 * 添加的动态路由记录
 */
const removeRouteFns: (() => void)[] = []

interface RouteStoreSetup {
  menus: Ref<Menu[]>
  toLogin(): void
  redirectFormLogin(): void
  addDynamicRoutes(roles: RoleType[]): void
  resetRoutes(): void
}

export const useRouteStore = defineStore(StoreId.Route, (): RouteStoreSetup => {
  const route = useRoute()

  /**
   * 菜单列表
   */
  const menus = ref<Menu[]>([])

  getMenus()

  function toLogin(): void {
    router.push({ name: LOGIN_ROUTE_NAME, query: { redirect: route.path } })
  }

  function toHome(): void {
    router.push({ name: HOME_ROUTE_NAME })
  }

  function redirectFormLogin(): void {
    const { redirect } = route.query
    if (redirect) {
      router.push(String(redirect))
    } else {
      toHome()
    }
  }

  /**
   * 添加动态路由
   * @param roles 用户角色列表
   */
  function addDynamicRoutes(roles: RoleType[]): void {
    addRoutes = filterAsyncRoutes(roles, dynamicRoutes)
    addRoutes.forEach((route) => {
      removeRouteFns.push(router.addRoute(route))
    })
    getMenus()
  }

  // 清空添加的动态路由
  function resetRoutes(): void {
    while (removeRouteFns.length) {
      removeRouteFns.pop()?.()
    }
  }

  /**
   * 获取菜单列表
   */
  function getMenus(): void {
    menus.value = genMenus([...staticRoutes, ...addRoutes])
  }

  return {
    menus,
    toLogin,
    redirectFormLogin,
    addDynamicRoutes,
    resetRoutes,
  }
})
