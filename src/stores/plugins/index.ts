/*
 * 重置 State 插件
 * */
import { StoreId } from '@/enum/index'
import { cloneJson } from '@/utils/cloneJson'

export function resetSetupStore(context) {
  const ids = Object.values(StoreId)

  if (!ids.includes(context.store.$id)) return

  const { $state } = context.store

  const defaultStore = cloneJson($state)

  context.store.$reset = () => {
    context.store.$patch(defaultStore)
  }
}
