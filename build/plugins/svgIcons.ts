import { readdirSync, readFileSync } from 'node:fs'
import { extname, join, relative, resolve } from 'node:path'

import type { Plugin, ViteDevServer } from 'vite'

/** 虚拟模块 id，`src/main.ts` 中的导入保持不变 */
export const SVG_ICONS_REGISTER_ID = 'virtual:svg-icons-register'
const RESOLVED_ID = '\0' + SVG_ICONS_REGISTER_ID
const SVG_NS = 'http://www.w3.org/2000/svg'

export interface SvgIconsPluginOptions {
  /** 本地图标目录（绝对路径） */
  iconDir: string
  /** symbol id 前缀，需与 `SvgIcon` 组件的 symbolId 规则一致 */
  symbolIdPrefix: string
  /** 注入的 svg 根节点 id */
  customDomId?: string
}

/**
 * 计算 symbol id
 * - 根目录：`{prefix}-{name}`
 * - 子目录：`{prefix}-{dir}-{name}`（多级目录用 `-` 连接）
 */
export function createSymbolId(prefix: string, relativePath: string): string {
  const normalized = relativePath.replace(/\\/g, '/')
  const withoutExt = normalized.slice(0, normalized.length - extname(normalized).length)
  const segments = withoutExt.split('/').filter(Boolean)
  const name = segments.pop() ?? ''
  return [prefix, ...segments, name].filter(Boolean).join('-')
}

/**
 * 把 svg 文件内容转换为 `<symbol>` 节点
 * - 保留根节点的 `viewBox` / `fill`，去掉 `<svg>` 包装
 */
export function renderSymbol(svgContent: string, symbolId: string): string | null {
  const match = /<svg([^>]*)>([\s\S]*)<\/svg>/i.exec(svgContent)
  if (!match) return null

  const [, attrs = '', children = ''] = match
  const viewBox = /viewBox="([^"]+)"/i.exec(attrs)?.[1]
  const fill = /(?:^|\s)fill="([^"]+)"/i.exec(attrs)?.[1]
  const viewBoxAttr = viewBox ? ` viewBox="${viewBox}"` : ''
  const fillAttr = fill ? ` fill="${fill}"` : ''

  return `<symbol id="${symbolId}"${viewBoxAttr}${fillAttr}>${children}</symbol>`
}

/** 生成需要注入 DOM 的 sprite（仅 `<symbol>` 集合） */
export function renderSprite(symbols: string[]): string {
  return symbols.join('')
}

function collectSvgFiles(dir: string, result: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      collectSvgFiles(fullPath, result)
      continue
    }
    if (extname(entry.name).toLowerCase() === '.svg') {
      result.push(fullPath)
    }
  }
  return result
}

/** 扫描目录并生成 `<symbol>` 列表（按文件路径排序，保证产物稳定） */
export function loadSymbols(iconDir: string, symbolIdPrefix: string): string[] {
  return collectSvgFiles(iconDir)
    .sort()
    .map((file) => renderSymbol(readFileSync(file, 'utf-8'), createSymbolId(symbolIdPrefix, relative(iconDir, file))))
    .filter((symbol): symbol is string => symbol !== null)
}

/** 生成 `virtual:svg-icons-register` 的模块代码：把 sprite 注入到 body 末尾 */
export function createRegisterCode(sprite: string, customDomId: string): string {
  return `
if (typeof window !== 'undefined') {
  function loadSvg() {
    const body = document.body
    let svgDom = document.getElementById(${JSON.stringify(customDomId)})
    if (!svgDom) {
      svgDom = document.createElementNS(${JSON.stringify(SVG_NS)}, 'svg')
      svgDom.id = ${JSON.stringify(customDomId)}
      svgDom.setAttribute('aria-hidden', 'true')
      svgDom.style.position = 'absolute'
      svgDom.style.width = '0'
      svgDom.style.height = '0'
      svgDom.style.overflow = 'hidden'
    }
    svgDom.innerHTML = ${JSON.stringify(sprite)}
    body.insertBefore(svgDom, body.lastChild)
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSvg)
  } else {
    loadSvg()
  }
}
export default {}
`
}

/**
 * 本地 SVG sprite 插件（替代停止维护的 `vite-plugin-svg-icons`）
 * - 导出与旧插件相同的 `virtual:svg-icons-register` 虚拟模块
 * - 图标目录变化时触发全量刷新
 */
export function svgIcons({ iconDir, symbolIdPrefix, customDomId = '__SVG_ICON_LOCAL__' }: SvgIconsPluginOptions): Plugin {
  const iconRoot = resolve(iconDir)

  return {
    name: 'local-svg-icons',

    resolveId(id) {
      return id === SVG_ICONS_REGISTER_ID ? RESOLVED_ID : null
    },

    load(id) {
      if (id !== RESOLVED_ID) return null
      return createRegisterCode(renderSprite(loadSymbols(iconRoot, symbolIdPrefix)), customDomId)
    },

    configureServer(server: ViteDevServer) {
      const reload = (file: string): void => {
        if (!file.startsWith(iconRoot)) return
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID)
        if (mod) void server.moduleGraph.invalidateModule(mod)
        server.ws.send({ type: 'full-reload' })
      }

      server.watcher.add(iconRoot)
      server.watcher.on('add', reload)
      server.watcher.on('change', reload)
      server.watcher.on('unlink', reload)
    },
  }
}
