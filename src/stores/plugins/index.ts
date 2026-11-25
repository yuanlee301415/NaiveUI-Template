/*
 * 重置 State 插件
 * */
import type { PiniaPluginContext } from 'pinia'
import { StoreId } from '@/enum'
import { cloneJson } from '@/utils/cloneJson'

export function resetSetupStore(context: PiniaPluginContext): void {
  const ids: string[] = Object.values(StoreId)

  if (!ids.includes(context.store.$id)) return

  const { $state } = context.store

  const defaultStore = cloneJson($state)

  context.store.$reset = () => {
    context.store.$patch(defaultStore)
  }
}
