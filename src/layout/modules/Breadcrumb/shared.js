/**
 * 面包屑 Model
 */
export class Breadcrumb {
  /**
   * 路由 `name`
   * @type {string}
   */
  key

  /**
   * 路由 `path`
   * @type {string}
   */
  path

  /**
   * 路由 `title`
   * @type {string}
   */
  title

  /**
   * 路由 `icon`
   * @type {string}
   */
  icon

  /**
   * 下拉菜单
   * @type {Breadcrumb[] | null}
   */
  children = null

  /**
   * @param {Breadcrumb} _
   */
  constructor(_) {
    const { key, path, title, icon } = { ..._ }
    this.key = key
    this.path = path
    this.title = title
    this.icon = icon
  }

  /**
   * 生成面包屑数据
   * @param {RouteLocation[]} routes
   * @return {Breadcrumb[]}
   */
  static genBreadcrumbsByRoutes(routes) {
    const genBreadcrumbs = (routes, ret = []) => {
      for (const route of routes) {
        if (!route.meta?.title) continue

        const item = new this({
          key: route.name,
          path: route.path,
          title: route.meta.title,
          icon: route.meta.icon,
        })

        if (route.children?.length) {
          const children = genBreadcrumbs(route.children)
          if (children.length) {
            item.children = children
          }
        }
        ret.push(item)
      }
      return ret
    }
    return genBreadcrumbs(routes)
  }
}
