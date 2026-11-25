import type { RouteRecordRaw } from 'vue-router'
import { Menu } from '@/models/index'
import type { RoleType } from '@/enum'

/**
 * 路由权限判断
 * - 路由没有配置 `roles` 字段，则表示此路由无权限限制
 * - 如果用户角色存在路由 `roles`，则表示有权限访问，否则无权限
 * @param roles 用户角色
 * @param route 路由
 * @return 是否有权限
 */
export function hasPermission(roles: RoleType[], route: RouteRecordRaw): boolean {
  const requiredRoles = route.meta?.roles
  if (!requiredRoles) return true
  return requiredRoles.some((_) => roles.includes(_))
}

/**
 * 过滤路由
 * @param roles 用户角色
 * @param routes 路由列表
 * @return 路由列表
 */
export function filterAsyncRoutes(roles: RoleType[], routes: RouteRecordRaw[]): RouteRecordRaw[] {
  function filter(routes?: RouteRecordRaw[]): RouteRecordRaw[] | undefined {
    const ret: RouteRecordRaw[] = []
    if (!routes) return undefined
    for (const route of routes) {
      if (hasPermission(roles, route)) {
        const temp = { ...route, children: filter(route.children) }
        ret.push(temp as RouteRecordRaw)
      }
    }
    return ret
  }

  return filter(routes) ?? []
}

/**
 * 生成菜单
 * @param routes 路由列表
 * @param path 父级路径
 * @param depth 嵌套深度
 * @param result 缓存的中间结果
 * @return 菜单列表
 */
export function genMenus(routes: RouteRecordRaw[], path = '', depth = 1, result: Menu[] = []): Menu[] {
  for (const route of routes) {
    // 没有 `title`
    if (!route.meta?.title) continue

    // 子路由全部无权限
    if (route.children?.length === 0) continue

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
