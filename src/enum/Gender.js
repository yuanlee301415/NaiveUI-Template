/*
* 性别
* */

const MALE = [1, '男']

const FEMALE = [2, '女']

/**
 * 性别 Enum
 * - Male: 1
 * - Female: 2
 * - 1: 男
 * - 2: 女
 * @enum {number}
 */
export const Gender = {
  Male: MALE[0],

  Female: FEMALE[0],

  [MALE[0]]: MALE[1],

  [FEMALE[0]]: FEMALE[1],

  * [Symbol.iterator]() {
    yield [MALE[0], MALE[1]]
    yield [FEMALE[0], FEMALE[1]]
  }
}
