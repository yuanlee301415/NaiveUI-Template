import type { RouteRecordNormalized } from 'vue-router'

/**
 * 面包屑 Model
 */
export class Breadcrumb {
  /** 路由 `name` */
  key?: string | symbol

  /** 路由 `path` */
  path: string

  /** 路由 `title` */
  title: string

  /** 路由 `icon` */
  icon?: string

  /** 下拉菜单 */
  children: Breadcrumb[] | null = null

  constructor(_: Partial<Breadcrumb> = {}) {
    const { key, path = '', title = '', icon } = _
    this.key = key
    this.path = path
    this.title = title
    this.icon = icon
  }

  /**
   * 生成面包屑数据
   */
  static genBreadcrumbsByRoutes(routes: readonly RouteRecordNormalized[]): Breadcrumb[] {
    const genBreadcrumbs = (routes: readonly RouteRecordNormalized[], ret: Breadcrumb[] = []): Breadcrumb[] => {
      for (const route of routes) {
        if (!route.meta?.title) continue

        const item = new Breadcrumb({
          key: route.name ?? undefined,
          path: route.path,
          title: route.meta.title,
          icon: route.meta.icon,
        })

        if (route.children?.length) {
          const children = genBreadcrumbs(route.children as unknown as readonly RouteRecordNormalized[])
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
