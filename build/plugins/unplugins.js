import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/dist/vite.js'
import { NaiveUiResolver } from 'unplugin-vue-components/dist/resolvers.js'

export function setupUnplugins() {
  return [
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
    })
  ]
}
