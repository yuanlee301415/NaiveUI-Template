/*
 * 路由 Store
 * */

import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'

import { router } from '@/router'
import { StoreId } from '@/enum/index.js'
import { Menu } from '@/models'
import { dynamicRoutes, staticRoutes } from '@/router/routes'
import { HOME_ROUTE_NAME, LOGIN_ROUTE_NAME } from '@/router/constants.js'

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

/**
 * 路由权限判断
 * - 路由没有配置 `roles` 字段，则表示此路由无权限限制
 * - 如果用户角色存在路由 `roles`，则表示有权限访问，否则无权限
 * @param {string[]} roles 用户角色
 * @param {RouteLocation} route 路由
 * @return {boolean} 是否有权限
 */
const hasPermission = (roles, route) => {
  if (!route.meta?.roles) return true
  return route.meta.roles.some((_) => roles.includes(_))
}

/**
 * 过滤路由
 * @param {string[]} roles 用户角色
 * @param {RouteLocation[]} routes 路由列表
 * @return {RouteLocation[]} 路由列表
 */
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

/**
 * 生成菜单
 * @param {RouteLocation[]} routes 路由列表
 * @param {string} [path]
 * @param {number} [depth] 嵌套深度
 * @param {Menu[]} [result] 缓存的中间结果
 * @return {Menu[]} 菜单列表
 */
const genMenus = (routes, path = '', depth = 1, result = []) => {
  for (const route of routes) {
    if (!route?.meta?.title) continue
    const menu = new Menu({
        path: path ? path + '/' + route.path : route.path,
        icon: route.meta.icon,
        title: route.meta.title,
        depth,
    })

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
   * @return {Menu[]}
   */
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
