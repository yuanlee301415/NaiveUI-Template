/*
* 使用状态
* */

const DISABLED = [0, '禁用']

const ENABLED = [1, '启用']

/**
 * 使用状态 Enum
 * - Disabled: 0
 * - Enabled: 1
 * - 0: 禁用
 * - 1: 启用
 * @enum {number}
 */
export const UsingStatus = {
  Disabled: DISABLED[0],

  Enabled: ENABLED[0],

  [DISABLED[0]]: DISABLED[1],

  [ENABLED[0]]: ENABLED[1],

  * [Symbol.iterator]() {
    yield { value: DISABLED[0], label: DISABLED[1] }
    yield { value: ENABLED[0], label: ENABLED[1] }
  }
}
