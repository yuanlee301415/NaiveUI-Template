import { describe, expect, it } from 'vitest'

import formatDate from '@/utils/formatDate'

const TIMESTAMP = new Date(2026, 0, 2, 3, 4, 5).getTime()

describe('formatDate', () => {
  it('格式化时间戳为完整格式', () => {
    expect(formatDate(TIMESTAMP)).toBe('2026/01/02 03:04:05')
  })

  it('短格式只返回年月日', () => {
    expect(formatDate(TIMESTAMP, { isShort: true })).toBe('2026/01/02')
  })

  it('支持自定义分隔符', () => {
    expect(formatDate(TIMESTAMP, { isShort: true, separator: '-' })).toBe('2026-01-02')
  })

  it('支持日期字符串', () => {
    expect(formatDate('2026-01-02T03:04:05')).toBe('2026/01/02 03:04:05')
  })

  it('无效值返回占位符', () => {
    expect(formatDate(undefined)).toBe('--')
    expect(formatDate(null)).toBe('--')
  })

  it('支持自定义占位符', () => {
    expect(formatDate(undefined, { placeholder: 'N/A' })).toBe('N/A')
  })
})
