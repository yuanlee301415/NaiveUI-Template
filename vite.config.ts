import { fileURLToPath, URL } from 'node:url'
import { cwd } from 'node:process'

import { defineConfig, loadEnv } from 'vite'
import { setupVitePlugins } from './build/plugins/index.ts'
import pkg from './package.json' with { type: 'json' }

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const root = cwd()
  const env = loadEnv(mode, root)

  if (process.env.DEBUG_ENV) {
    console.log('ENV:\n', env)
  }

  const { VITE_PORT, VITE_INTERNAL_VERSION, VITE_BASE_API, VITE_PROXY } = env
  const __APP_VERSION__ = [pkg.version, VITE_INTERNAL_VERSION].join('.')
  const __APP_BUILD_TIME__ = new Date().toISOString()
  // `pnpm analyze` 使用 `--mode analyze`，仅此时生成 bundle 分析报告
  const analyze = mode === 'analyze'
  // `pnpm types:gen` 使用 `--mode types`：只生成 unplugin 的 d.ts，不产出任何文件
  const isTypes = mode === 'types'

  // 生产构建移除 console.*（保留 console.debug / console.error）
  const pureFuncs = Object.keys(console)
    .filter((key) => !['debug', 'error'].includes(key))
    .map((key) => `console.${key}`)

  // 开发服务与预览服务共用的接口代理
  const proxy = VITE_PROXY
    ? {
        [VITE_BASE_API]: {
          target: VITE_PROXY,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(VITE_BASE_API, ''),
        },
      }
    : undefined

  return {
    plugins: setupVitePlugins({ mode, version: __APP_VERSION__, buildTime: __APP_BUILD_TIME__, viteEnv: env, analyze }),

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    server: {
      port: Number(VITE_PORT || 3000),
      proxy,
    },

    preview: {
      proxy,
    },

    define: {
      __APP_VERSION__: JSON.stringify(__APP_VERSION__),
      __APP_BUILD_TIME__: JSON.stringify(__APP_BUILD_TIME__),
    },

    build: {
      // types 模式只用于生成 d.ts，不写产物、不压缩
      write: !isTypes,
      minify: isTypes ? false : 'terser',
      reportCompressedSize: !isTypes,
      terserOptions: {
        compress: {
          drop_debugger: true,
          pure_funcs: pureFuncs,
        },
      },
      // naive-ui 为单个 vendor chunk（约 786KB raw / 206KB gzip），属预期
      chunkSizeWarningLimit: 1000,
      rolldownOptions: {
        output: {
          chunkFileNames: 'assets/js/[name].[hash].js',
          entryFileNames: 'assets/js/[name].[hash].js',
          assetFileNames: 'assets/[ext]/[name].[hash].[ext]',
          // Vite 8 使用 Rolldown，object 形式的 manualChunks 已移除，改用 codeSplitting
          codeSplitting: {
            groups: [
              {
                name: 'vue',
                test: /node_modules[\\/](vue|vue-router|pinia|@vue)[\\/]/,
                priority: 10,
              },
              {
                name: 'naive-ui',
                test: /node_modules[\\/]naive-ui[\\/]/,
                priority: 10,
              },
            ],
          },
        },
      },
    },
  }
})
