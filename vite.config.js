import { fileURLToPath, URL } from 'node:url'
import { cwd } from 'node:process'
import { resolve } from 'node:path'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { createHtmlPlugin } from "vite-plugin-html";
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'
import { visualizer } from "rollup-plugin-visualizer";

import pkg from "./package.json";

// https://vite.dev/config/
export default defineConfig(({mode}) => {

  const root = cwd();
  const env = loadEnv(mode, root);
  console.log("ENV:\n", env);

  const {
    VITE_PORT,
    VITE_INTERNAL_VERSION,
    VITE_BASE_API,
    VITE_PROXY,
    VITE_ICON_LOCAL_PREFIX
  } = env;
  const __APP_VERSION__ = [pkg.version, VITE_INTERNAL_VERSION].join(".");
  const __APP_BUILD_TIME__ = new Date().toISOString();


  return {
    plugins: [
      vue(),
      vueDevTools(),
      UnoCSS(),
      createHtmlPlugin({
        entry: "src/main.js",
        minify: true,
        inject: {
          data: {
            version: __APP_VERSION__,
            time: __APP_BUILD_TIME__,
            mode,
          },
        },
      }),

      AutoImport({
        imports: [
          'vue',
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar'
            ]
          }
        ]
      }),

      Components({
        resolvers: [NaiveUiResolver()]
      }),

      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(cwd(), 'src/assets/svg-icons')],

        // 指定symbolId格式
        symbolId: `${VITE_ICON_LOCAL_PREFIX}-[dir]-[name]`,

        /**
         * 自定义插入位置
         * @default: body-last
         */
        inject: 'body-last',

        customDomId: '__SVG_ICON_LOCAL__',
      }),

      visualizer({
        filename: 'dist/report.html',
        title: `Bundle Analysis - ${new Date().toLocaleString()}`
      })
    ],

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },

    server: {
      port: Number(VITE_PORT),
      proxy:
        VITE_PROXY ? {
            [VITE_BASE_API]: {
              target: VITE_PROXY,
              changeOrigin: true,
              rewrite: (path) => path.replace(VITE_BASE_API, ""),
            },
          }
          : undefined,
    },

    preview: {
      proxy:
        VITE_PROXY ? {
            [VITE_BASE_API]: {
              target: VITE_PROXY,
              changeOrigin: true,
              rewrite: (path) => path.replace(VITE_BASE_API, ""),
            },
          }
          : undefined,
    },

    define: {
      __APP_VERSION__: JSON.stringify(__APP_VERSION__),
      __APP_BUILD_TIME__: JSON.stringify(__APP_BUILD_TIME__)
    }
  }
})

