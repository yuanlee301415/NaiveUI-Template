/*
 * NaiveUI 库工具方法
 * */

/**
 * NInput trim() 效果
 * @param {string} value
 * @return {boolean}
 */
export function noSideSpace(value) {
  return !value.startsWith(' ') && !value.endsWith(' ')
}
