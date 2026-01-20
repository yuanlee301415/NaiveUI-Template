import { Menu } from '@/models/index.js'

/**
 * 路由权限判断
 * - 路由没有配置 `roles` 字段，则表示此路由无权限限制
 * - 如果用户角色存在路由 `roles`，则表示有权限访问，否则无权限
 * @param {Role[]} roles 用户角色
 * @param {RouteLocation} route 路由
 * @return {boolean} 是否有权限
 */
export function hasPermission(roles, route) {
  if (!route.meta?.roles) return true
  return route.meta.roles.some((_) => roles.includes(_))
}

/**
 * 过滤路由
 * @param {Role[]} roles 用户角色
 * @param {RouteLocation[]} routes 路由列表
 * @return {RouteLocation[]} 路由列表
 */
export function filterAsyncRoutes(roles, routes) {
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
export function genMenus(routes, path = '', depth = 1, result = []) {
  for (const route of routes) {
    // 没有 `title`
    if (!route?.meta?.title) continue

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
