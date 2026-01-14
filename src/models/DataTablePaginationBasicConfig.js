/*
* Naive DataTable 组件分页基础配置
* */

/**
 * DataTablePaginationBasicConfig Model
 */
export class DataTablePaginationBasicConfig {
  /**
   * @type {number}
   */
  page

  /**
   * @type {number}
   */
  pageSize

  /**
   * 每页条数
   * @type {number[]}
   */
  pageSizes

  /**
   * 分页总数
   * @type {number}
   */
  pageCount

  /**
   * 数据总条数
   * @type {number}
   */
  itemCount

  /**
   * 是否显示每页条数的选择器
   * @type {boolean}
   */
  showSizePicker

  /**
   * 是否显示快速跳转
   * @type {boolean}
   */
  showQuickJumper

  /**
   * 分页后缀
   * @type {Function}
   */
  suffix

  /**
   * @param {DataTablePaginationBasicConfig} [_]
   */
  constructor(_) {
    const { page = 1, pageSize = 10, pageSizes = [10, 20, 30, 50], pageCount = 0, itemCount = 0, showQuickJumper = true, showSizePicker = true, suffix } = { ..._ }
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
