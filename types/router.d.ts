import type { RoleType } from '@/enum'

declare module 'vue-router' {
  interface RouteMeta {
    /** 菜单/页面标题 */
    title?: string
    /** 菜单图标（UnoCSS class） */
    icon?: string
    /** 允许访问的角色；不配置表示无权限限制 */
    roles?: RoleType[]
  }
}

export {}
