import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import pkg from "./package.json";

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  // eslint-disable-next-line no-undef
  const root = process.cwd();
  const env = loadEnv(mode, root);
  console.log("ENV:\n", env);

  const {
    VITE_PORT,
    VITE_INTERNAL_VERSION,
    VITE_BASE_API,
    VITE_PROXY,
  } = env;
  const __APP_VERSION__ = [pkg.version, VITE_INTERNAL_VERSION].join(".");
  const __APP_BUILD_TIME__ = new Date().toISOString();


  return {
    plugins: [
      vue(),
      vueDevTools(),
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

    define: {
      __APP_VERSION__: JSON.stringify(__APP_VERSION__),
      __APP_BUILD_TIME__: JSON.stringify(__APP_BUILD_TIME__)
    }
  }
})

