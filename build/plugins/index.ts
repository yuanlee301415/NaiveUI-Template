import { cwd } from 'node:process'
import { resolve } from 'node:path'

import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { html } from './html.ts'
import { svgIcons } from './svgIcons.ts'
import { setupUnplugins } from './unplugins.ts'
import { releasePlugin } from './release.ts'

export interface SetupVitePluginsOptions {
  mode: string
  version: string
  buildTime: string
  viteEnv: Record<string, string>
  /** 是否生成 bundle 分析报告（仅 `--mode analyze` 时开启） */
  analyze?: boolean
}

export function setupVitePlugins({ mode, version, buildTime, viteEnv, analyze = false }: SetupVitePluginsOptions): PluginOption[] {
  const { VITE_ICON_LOCAL_PREFIX } = viteEnv

  return [
    vue(),

    UnoCSS(),

    html({ mode, version, buildTime }),

    ...setupUnplugins(),

    svgIcons({
      iconDir: resolve(cwd(), 'src/assets/svg-icons'),
      symbolIdPrefix: VITE_ICON_LOCAL_PREFIX,
      customDomId: '__SVG_ICON_LOCAL__',
    }),

    releasePlugin({ mode, version, buildTime }),

    // 仅在 analyze 模式下生成 bundle 分析报告
    ...(analyze
      ? [
          visualizer({
            filename: 'dist/report.html',
            title: `Bundle Analysis - ${new Date().toLocaleString()}`,
          }),
        ]
      : []),
  ]
}
