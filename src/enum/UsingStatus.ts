/*
 * 使用状态
 * */

import type { EnumOption } from './shared'

const DISABLED = [0, '禁用'] as const

const ENABLED = [1, '启用'] as const

export type UsingStatusValue = 0 | 1

interface UsingStatusEnum {
  readonly Disabled: 0
  readonly Enabled: 1
  0: '禁用'
  1: '启用'
  [Symbol.iterator](): IterableIterator<EnumOption<UsingStatusValue>>
}

/**
 * 使用状态 Enum
 */
export const UsingStatus: UsingStatusEnum = {
  Disabled: DISABLED[0],

  Enabled: ENABLED[0],

  [DISABLED[0]]: DISABLED[1],

  [ENABLED[0]]: ENABLED[1],

  *[Symbol.iterator]() {
    yield { value: DISABLED[0], label: DISABLED[1] }
    yield { value: ENABLED[0], label: ENABLED[1] }
  },
}
