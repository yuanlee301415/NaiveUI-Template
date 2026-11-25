/**
 * 格式化时间
 */
export interface FormatDateOptions {
  /** 是否使用短格式（只返回年月日） */
  isShort?: boolean
  /** 年月日连接符 */
  separator?: string
  /** 无数据时的占位符 */
  placeholder?: string
}

/**
 * 格式化时间
 * @param value 时间戳|日期字符串|日期对象
 * @param isShort 是否使用短格式（只包含年月日）
 * @param separator 年月日分隔符
 * @param placeholder 无效数据时占位符
 * @returns 格式化后的字符串
 */
export default function formatDate(
  value?: number | string | Date | null,
  { isShort = false, separator = '/', placeholder = '--' }: FormatDateOptions = {},
): string {
  const parsedTime = new Date(value ?? '').getTime()
  const date = new Date(parsedTime || new Date(Number(value)).getTime())

  // 无效数据
  if (!date.getTime()) return placeholder

  // 短格式（只返回：年月日）
  const [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
  const ymdStr = [year, month.toString().padStart(2, '0'), day.toString().padStart(2, '0')].join(separator)
  if (isShort) return ymdStr

  // 全格式（年月日时分秒）
  const [hour, min, sec] = [date.getHours(), date.getMinutes(), date.getSeconds()]
  return ymdStr + ' ' + [hour.toString().padStart(2, '0'), min.toString().padStart(2, '0'), sec.toString().padStart(2, '0')].join(':')
}
