import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

// 单元测试独立配置：不加载 UnoCSS / 自动导入 / 构建插件，保持秒级启动
export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  test: {
    environment: 'jsdom',
    include: ['src/**/__tests__/**/*.spec.ts', 'build/**/__tests__/**/*.spec.ts'],
    restoreMocks: true,
    env: {
      VITE_ICON_LOCAL_PREFIX: 'icon-local',
    },
  },
})
