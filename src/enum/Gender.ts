/*
 * 性别
 * */

import type { EnumOption } from './shared'

const MALE = [1, '男'] as const

const FEMALE = [2, '女'] as const

export type GenderValue = 1 | 2

interface GenderEnum {
  readonly Male: 1
  readonly Female: 2
  1: '男'
  2: '女'
  [Symbol.iterator](): IterableIterator<EnumOption<GenderValue>>
}

/**
 * 性别 Enum
 */
export const Gender: GenderEnum = {
  Male: MALE[0],

  Female: FEMALE[0],

  [MALE[0]]: MALE[1],

  [FEMALE[0]]: FEMALE[1],

  *[Symbol.iterator]() {
    yield { value: MALE[0], label: MALE[1] }
    yield { value: FEMALE[0], label: FEMALE[1] }
  },
}
