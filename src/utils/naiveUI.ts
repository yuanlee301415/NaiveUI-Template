/*
 * NaiveUI 库工具方法
 * */

/**
 * NInput trim() 效果
 */
export function noSideSpace(value: string): boolean {
  return !value.startsWith(' ') && !value.endsWith(' ')
}
