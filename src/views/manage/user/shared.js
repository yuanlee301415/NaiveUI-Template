import { h } from 'vue'
import { NButton, NFlex, NTag, NPopconfirm } from 'naive-ui'
import { User } from '@/models/index.js'
import { Gender, UsingStatus } from '@/enum/index.js'

/**
 * 生成表格列配置
 * @param {Function} handleEdit 点击“编辑”按钮回调
 * @param {Function} handleDelete 点击“删除”按钮回调
 * @return {DataTableColumns<User>}
 */
export function createColumns({ handleEdit, handleDelete }) {
  return [
    { type: 'selection', width: 50 },
    { title: 'ID', key: 'id', width: 60 },
    { title: User.LOGIN_LABEL, key: 'login', sorter: true },
    { title: User.NAME_LABEL, key: 'name', sorter: true },
    { title: User.PHONE_LABEL, key: 'phone', width: 120, sorter: true },
    { title: User.EMAIL_LABEL, key: 'email', sorter: true },
    {
      title: User.GENDER_LABEL,
      key: 'gender',
      width: 80,
      sorter: true,
      render: ({ gender }) =>
        gender === null ? null : h(NTag, { type: Gender.Male === gender ? 'success' : 'info' }, { default: () => Gender[gender] }),
    },
    {
      title: User.STATUS_LABEL,
      key: 'status',
      width: 80,
      sorter: true,
      render: ({ status }) =>
        status === null ? null : h(NTag, { type: UsingStatus.Enabled === status ? 'success' : 'error' }, { default: () => UsingStatus[status] }),
    },
    {
      title: User.CREATE_TIME_LABEL,
      key: 'createTime',
      width: 180,
      sorter: true,
      render: (row) => row.createTimeString,
    },
    {
      title: '操作',
      key: 'actions',
      fixed: 'right',
      width: 160,
      render: (row) =>
        h(
          NFlex,
          { size: 'large' },
          {
            default: () => [
              h(
                NButton,
                {
                  tertiary: true,
                  onClick: () => handleEdit(row),
                },
                {
                  default: () => '编辑',
                },
              ),
              h(
                NPopconfirm,
                {
                  onPositiveClick: () => handleDelete(row),
                },
                {
                  default: () => '确认删除？',
                  trigger: () =>
                    h(
                      NButton,
                      {
                        tertiary: true,
                        type: 'error',
                      },
                      {
                        default: () => '删除',
                      },
                    ),
                },
              ),
            ],
          },
        ),
    },
  ]
}

/**
 * 生成表格行 Key
 * @param {User} row
 * @return {User.id}
 */
export function rowKey(row) {
  return row.id
}
