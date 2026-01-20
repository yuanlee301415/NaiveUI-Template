import { cwd } from 'node:process'
import { resolve } from 'node:path'

import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import UnoCSS from 'unocss/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { visualizer } from 'rollup-plugin-visualizer'
import { html } from './html.js'
import { setupUnplugins } from './unplugins.js'

export function setupVitePlugins({ mode, version, buildTime, viteEnv }) {
  const { VITE_ICON_LOCAL_PREFIX } = viteEnv

  return [
    vue(),

    vueDevTools(),

    UnoCSS(),

    html({ mode, version, buildTime }),

    ...setupUnplugins(),

    createSvgIconsPlugin({
      iconDirs: [resolve(cwd(), 'src/assets/svg-icons')],
      symbolId: `${VITE_ICON_LOCAL_PREFIX}-[dir]-[name]`,
      inject: 'body-last',
      customDomId: '__SVG_ICON_LOCAL__'
    }),

    visualizer({
      filename: 'dist/report.html',
      title: `Bundle Analysis - ${new Date().toLocaleString()}`
    })
  ]
}
