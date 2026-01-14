<!--
用户管理
-->

<script setup>
import { ref, reactive } from 'vue'
import { NFlex } from 'naive-ui'
import { getUsersApi, deleteUserApi, batchDeleteUserApi } from '@/api/user.js'
import { User, DataTablePaginationBasicConfig, DataTableSorter } from '@/models/index.js'
import { OperationType } from '@/enum/index.js'
import TableHeaderOperation from '@/components/TableHeaderOperation/index.vue'
import { createColumns, rowKey } from './shared.js'
import UserSearch from './UserSearch.vue'
import UserFrom from './UserForm.vue'

defineOptions({ name: 'ManageUser' })

/**
 * 用户列表
 * @type {Ref<User[]>}
 */
const users = ref([])

/**
 * 表格列配置
 * @type {DataTableColumns<User>}
 */
const columns = createColumns({ handleEdit, handleDelete })

/**
 * 用户表单
 * @type {Ref<HTMLFormElement | null>}
 */
const userFormRef = ref()

/**
 * 选中列 Key 列表
 * @type {Ref<User.id[]>}
 */
const checkedRowKeys = ref([])

/**
 * 搜索
 * @type {{loading: boolean, params: User.UserParams, sorter: DataTableSorter}}
 */
const search = reactive({
  loading: false,

  /**
   * 查询参数
   * @type {User.UserParams}
   */
  params: new User.UserParams(),

  /**
   * 排序
   * @type {DataTableSorter}
   */
  sorter: null
})

/**
 * 弹窗表单
 * @type {{visible: boolean, operationType: OperationType, loading: boolean, title: string, user: User}}
 */
const modalForm = reactive({
  // 是否显示
  visible: false,

  // 加载中
  loading: false,

  // 操作类型
  operationType: OperationType.Add,

  /**
   * 当前选择行数据
   * @type {User}
   */
  user: null,

  // 弹窗标题
  get title() {
    return this.operationType + ' - 用户'
  }
})

/**
 * 分页配置
 * @type {DataTablePaginationBasicConfig & {onUpdatePage(): void, onUpdatePageSize(): void}}
 */
const pagination = reactive({
  ...new DataTablePaginationBasicConfig(),
  onUpdatePage(page) {
    pagination.page = page
    getUsers()
  },
  onUpdatePageSize(pageSize) {
    pagination.pageSize = pageSize
    pagination.page = 1
    getUsers()
  }
})

getUsers()

// 获取用户
async function getUsers() {
  search.loading = true
  try {
    const { data, pages, items } = await getUsersApi({ ...search.params, page: pagination.page, size: pagination.pageSize, sort: search.sorter?.sortString })
    users.value = User.from(data)
    pagination.pageCount = pages
    pagination.itemCount = items
  } finally {
    search.loading = false
  }
}

/**
 * 编辑用户
 * @param {User} user
 */
function handleEdit(user) {
  modalForm.operationType = OperationType.Edit
  modalForm.user = user
  modalForm.visible = true
}

/**
 * 删除用户
 * @param {User} user
 */
async function handleDelete(user) {
  await deleteUserApi(user.id)
  window.$notification.success({ content: '删除用户成功！', duration: 5000 })
  getUsers()
}

// 搜索
function onSearch() {
  pagination.page = 1
  getUsers()
}

// 重置搜索条件
function onReset() {
  search.params = new User.UserParams()
}

// 打开新增弹窗
function onAdd() {
  modalForm.operationType = OperationType.Add
  modalForm.user = new User()
  modalForm.visible = true
}

// 批量删除
async function onBatchDelete() {
  await batchDeleteUserApi(checkedRowKeys.value)
  window.$notification.success({ content: '批量删除用户成功！', duration: 5000 })
  getUsers()
  checkedRowKeys.value = []
}

// 刷新列表
function onRefresh() {
  getUsers()
}

// 提交表单
async function handleSubmit() {
  modalForm.loading = true
  try {
    await userFormRef.value?.submit()
    await getUsers()
  } finally {
    modalForm.loading = false
  }
}

/**
 * 选择表格行
 * @param {User.id[]} keys
 */
function onCheckedRowKeys(keys) {
  checkedRowKeys.value = keys
}

/**
 * 排序
 * @param {DataTableSortState} sorter
 */
function onUpdateSorter(sorter) {
  search.sorter = new DataTableSorter(sorter)
  getUsers()
}
</script>

<template>
  <n-flex vertical :size="20" class="h-full">

    <UserSearch v-model:params="search.params" :loading="search.loading" @search="onSearch" @reset="onReset" />

    <n-card title="用户管理" segmented class="flex-1 overflow-hidden">
      <template #header-extra>
        <TableHeaderOperation :loading="search.loading" :disabled-delete="!checkedRowKeys.length" @add="onAdd" @batch-delete="onBatchDelete" @refresh="onRefresh" />
      </template>
      <n-data-table
        :columns="columns"
        :data="users"
        :loading="search.loading"
        :pagination="pagination"
        :row-key="rowKey"
        :checked-row-keys="checkedRowKeys"
        scroll-x="1400"
        class="h-full"
        remote
        striped
        flex-height
        @update:checked-row-keys="onCheckedRowKeys"
        @update:sorter="onUpdateSorter"
      >
      </n-data-table>
    </n-card>

    <n-modal
      v-model:show="modalForm.visible"
      :title="modalForm.title"
      :loading="modalForm.loading"
      :mask-closable="false"
      :show-icon="false"
      preset='dialog'
      negative-text='取消'
      positive-text='确认'
      style="width: 50vw;max-width: 700px;"
      auto-focus
      trap-focus
      @positive-click="handleSubmit"
    >
      <UserFrom :user="modalForm.user" :operation-type="modalForm.operationType" ref="userFormRef" />
    </n-modal>
  </n-flex>
</template>
