import type { DialogApi, LoadingBarApi, MessageApi, NotificationApi } from 'naive-ui'

declare global {
  interface Window {
    /** NaiveUI 消息 API（脱离上下文） */
    $message: MessageApi
    /** NaiveUI 对话框 API（脱离上下文） */
    $dialog: DialogApi
    /** NaiveUI 通知 API（脱离上下文） */
    $notification: NotificationApi
    /** NaiveUI 加载条 API（脱离上下文） */
    $loading: LoadingBarApi
  }
}

export {}
