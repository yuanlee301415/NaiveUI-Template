import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import type { PluginOption } from 'vite'

export function setupUnplugins(): PluginOption[] {
  return [
    AutoImport({
      imports: [
        'vue',
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
        },
      ],
      dts: 'types/auto-imports.d.ts',
    }),

    Components({
      resolvers: [NaiveUiResolver()],
      dts: 'types/components.d.ts',
    }),
  ]
}
