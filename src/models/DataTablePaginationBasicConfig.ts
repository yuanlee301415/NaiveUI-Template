/*
 * Naive DataTable 组件分页基础配置
 * */

export type PaginationSuffix = (info: { itemCount: number }) => string

/**
 * DataTablePaginationBasicConfig Model
 */
export class DataTablePaginationBasicConfig {
  /** 当前页 */
  page: number

  /** 每页条数 */
  pageSize: number

  /** 每页条数选项 */
  pageSizes: number[]

  /** 分页总数 */
  pageCount: number

  /** 数据总条数 */
  itemCount: number

  /** 是否显示每页条数的选择器 */
  showSizePicker: boolean

  /** 是否显示快速跳转 */
  showQuickJumper: boolean

  /** 分页后缀 */
  suffix: PaginationSuffix

  constructor(_: Partial<DataTablePaginationBasicConfig> = {}) {
    const {
      page = 1,
      pageSize = 10,
      pageSizes = [10, 20, 30, 50],
      pageCount = 0,
      itemCount = 0,
      showQuickJumper = true,
      showSizePicker = true,
      suffix,
    } = _
    this.page = page
    this.pageSize = pageSize
    this.pageSizes = pageSizes
    this.pageCount = pageCount
    this.itemCount = itemCount
    this.showSizePicker = showSizePicker
    this.showQuickJumper = showQuickJumper
    this.suffix = suffix ?? (({ itemCount }) => `共 ${itemCount} 条记录`)
  }
}
