import { describe, expect, it } from 'vitest'

import { DataTableSorter } from '@/models/DataTableSorter'

describe('DataTableSorter.sortString', () => {
  it('升序返回字段名', () => {
    expect(new DataTableSorter({ columnKey: 'name', order: 'ascend' }).sortString).toBe('name')
  })

  it('降序返回 -字段名', () => {
    expect(new DataTableSorter({ columnKey: 'name', order: 'descend' }).sortString).toBe('-name')
  })

  it('取消排序返回 undefined', () => {
    expect(new DataTableSorter({ columnKey: 'name', order: false }).sortString).toBeUndefined()
  })

  it('无排序字段与排序方式时返回 undefined', () => {
    expect(new DataTableSorter().sortString).toBeUndefined()
  })
})
