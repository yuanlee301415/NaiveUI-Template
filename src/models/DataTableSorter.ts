/*
 * DataTable 排序
 * */

// 降序
const DESCEND = 'descend'

// 降序标识符
const DESCEND_PREFIX = '-'

export type SorterOrder = 'ascend' | 'descend' | false | null

/**
 * DataTable 排序 Model
 */
export class DataTableSorter {
  /** 排序字段 */
  columnKey: string | null

  /** 排序方式 */
  order: SorterOrder

  constructor(_: Partial<DataTableSorter> = {}) {
    const { columnKey = null, order = null } = _
    this.columnKey = columnKey
    this.order = order
  }

  /**
   * 转换为 json-server 需要的排序格式
   * - 当没有排序时，返回 undefined，以便 API 应用排序参数的缺省值
   */
  get sortString(): string | undefined {
    const { columnKey, order } = this
    return [order === DESCEND ? DESCEND_PREFIX : '', order === false ? '' : columnKey].filter(Boolean).join('') || undefined
  }
}
