/**
 * 操作类型 Enum
 * - Add: '新增'
 * - Edit: '编辑'
 */
export const OperationType = {
  Add: '新增',
  Edit: '编辑',
} as const

export type OperationTypeValue = (typeof OperationType)[keyof typeof OperationType]
