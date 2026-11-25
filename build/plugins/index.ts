import { cwd } from 'node:process'
import { resolve } from 'node:path'

import vue from '@vitejs/plugin-vue'
import type { PluginOption } from 'vite'
import UnoCSS from 'unocss/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { visualizer } from 'rollup-plugin-visualizer'
import { html } from './html.ts'
import { setupUnplugins } from './unplugins.ts'
import { releasePlugin } from './release.ts'

export interface SetupVitePluginsOptions {
  mode: string
  version: string
  buildTime: string
  viteEnv: Record<string, string>
}

export function setupVitePlugins({ mode, version, buildTime, viteEnv }: SetupVitePluginsOptions): PluginOption[] {
  const { VITE_ICON_LOCAL_PREFIX } = viteEnv

  return [
    vue(),

    UnoCSS(),

    html({ mode, version, buildTime }),

    ...setupUnplugins(),

    createSvgIconsPlugin({
      iconDirs: [resolve(cwd(), 'src/assets/svg-icons')],
      symbolId: `${VITE_ICON_LOCAL_PREFIX}-[dir]-[name]`,
      inject: 'body-last',
      customDomId: '__SVG_ICON_LOCAL__',
    }),

    releasePlugin({ mode, version, buildTime }),

    visualizer({
      filename: 'dist/report.html',
      title: `Bundle Analysis - ${new Date().toLocaleString()}`,
    }),
  ]
}
