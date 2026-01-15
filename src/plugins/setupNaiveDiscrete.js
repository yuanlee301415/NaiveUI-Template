import { createDiscreteApi, darkTheme, useOsTheme } from 'naive-ui'
import { computed } from 'vue'

/**
 * 挂载 Naive-ui 脱离上下文的 API
 * 如果你想在 setup 外使用 useDialog、useMessage、useNotification、useLoadingBar，可以通过 createDiscreteApi 来构建对应的 API。
 * @see https://www.naiveui.com/zh-CN/dark/components/discrete
 */
export function setupNaiveDiscreteApi() {
  const osTheme = useOsTheme()
  const configProviderPropsRef = computed(() => ({
      theme: osTheme.value === 'dark' ? darkTheme : null
    }
  ))
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

  /**
   * notification.success
   * @param {string} content 内容
   * @param {string} title 标题
   * @param {number} [duration=3000] 时长
   * @return {NotificationReactive}
   */
  window.$toastSuccess = function(content = '操作成功', title = '成功', duration = 3000) {
    return notification.success({ content, title, duration })
  }

  /**
   * notification.error
   * @param {string} content 内容
   * @param {string} title 标题
   * @param {number} [duration=3000] 时长
   * @return {NotificationReactive}
   */
  window.$toastError = function(content = '操作失败', title = '失败', duration = 3000) {
    return notification.error({ content, title, duration })
  }
}
