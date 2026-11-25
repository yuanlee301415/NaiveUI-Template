/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 应用标题 */
  readonly VITE_APP_TITLE: string
  /** API 前缀 */
  readonly VITE_BASE_API: string
  /** 开发服务端口 */
  readonly VITE_PORT: string
  /** 接口代理地址 */
  readonly VITE_PROXY: string
  /** 本地 SVG 图标前缀 */
  readonly VITE_ICON_LOCAL_PREFIX: string
  /** 内部版本号 */
  readonly VITE_INTERNAL_VERSION: string
  /** 是否开启用户权限 */
  readonly VITE_PERMISSION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/** 应用版本号（语义版本 + 内部版本号） */
declare const __APP_VERSION__: string

/** 应用构建时间 */
declare const __APP_BUILD_TIME__: string

declare module 'virtual:uno.css'

// vite-plugin-svg-icons 的虚拟模块（该包未通过 exports 暴露 client.d.ts，这里直接声明）
declare module 'virtual:svg-icons-register'
