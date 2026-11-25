import type { Plugin } from 'vite'

export interface HtmlPluginOptions {
  mode: string
  version: string
  buildTime: string
}

/**
 * 注入 release 信息（替换 `vite-plugin-html` 的 EJS 模板能力）
 * - `dev` 与 `build` 都会注入 `<meta name="release">`
 * - 标题等其它 `%VITE_*%` 占位符由 Vite 原生替换，无需额外插件
 */
export function html({ mode, version, buildTime }: HtmlPluginOptions): Plugin {
  const release = `${version}@${buildTime}@${mode}`

  return {
    name: 'local-html-release',
    transformIndexHtml() {
      return [
        {
          tag: 'meta',
          attrs: { name: 'release', content: release },
          injectTo: 'head',
        },
      ]
    },
  }
}
