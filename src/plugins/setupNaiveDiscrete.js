import { createDiscreteApi, darkTheme, useOsTheme } from 'naive-ui'
import { computed } from 'vue'

/**
 * 挂载 Naive-ui 脱离上下文的 API
 * 如果你想在 setup 外使用 useDialog、useMessage、useNotification、useLoadingBar，可以通过 createDiscreteApi 来构建对应的 API。
 * @see https://www.naiveui.com/zh-CN/dark/components/discrete
 */
export function setupNaiveDiscreteApi() {
  const configProviderPropsRef = computed(() => {
    const osTheme = useOsTheme()
    const theme = computed(() => osTheme.value === 'dark' ? darkTheme : null)
    return {
      theme
    }
  })

  const { message, dialog, notification, loadingBar } = createDiscreteApi(
    ['message', 'dialog', 'notification', 'loadingBar'],
    {
      configProviderProps: configProviderPropsRef
    }
  )

  window['$message'] = message
  window['$dialog'] = dialog
  window['$notification'] = notification
  window['$loading'] = loadingBar
}
