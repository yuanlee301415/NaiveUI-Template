/**
 * 格式化时间
 * @param {number|string|Date} value 时间戳|日期字符串|日期对象
 * @param {boolean} [isShort] 是否使用短格式（只返回年月日）
 * @param {string} [separator] 年月日连接符
 * @param {string} [placeholder] 无数据时的占位符
 * @returns {string} - 格式化后的字符串
 */
export default function formatDate(value, { isShort = false, separator = '/', placeholder = '--' } = {}) {
    value = new Date(new Date(value).getTime() || new Date(Number(value)).getTime())

    // 无效数据
    if (!value.getTime()) return placeholder

    // 短格式（只返回：年月日）
    const [year, month, date] = [value.getFullYear(), value.getMonth() + 1, value.getDate()]
    const ymdStr = [year, month.toString().padStart(2, '0'), date.toString().padStart(2, '0')].join(separator)
    if (isShort) return ymdStr

    // 全格式（年月日时分秒）
    const [hour, min, sec] = [value.getHours(), value.getMinutes(), value.getSeconds()]
    return ymdStr + ' ' + [hour.toString().padStart(2, '0'), min.toString().padStart(2, '0'), sec.toString().padStart(2, '0')].join(':')
}
