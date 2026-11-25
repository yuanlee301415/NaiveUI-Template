<!--
用户管理
-->
<script lang="ts">
import type { DataTableColumns, DataTableRowKey, DataTableSortState } from 'naive-ui'
import type { OperationTypeValue } from '@/enum'
import type { UserFormExpose } from './UserForm.vue'
import { getUsersApi, deleteUserApi, batchDeleteUserApi } from '@/api/user'
import { User, UserParams, DataTablePaginationBasicConfig, DataTableSorter } from '@/models'
import { OperationType } from '@/enum'
import { createColumns, rowKey } from './shared'
</script>

<script setup lang="ts">
import { ref, reactive, shallowRef, useTemplateRef } from 'vue'
import { NFlex } from 'naive-ui'
import TableHeaderOperation from '@/components/TableHeaderOperation/index.vue'
import UserSearch from './UserSearch.vue'
import UserFrom from './UserForm.vue'

defineOptions({ name: 'ManageUser' })

/**
 * 用户列表
 */
const users = shallowRef<User[]>([])

/**
 * 表格列配置
 */
const columns: DataTableColumns<User> = createColumns({ handleEdit, handleDelete })

/**
 * 用户表单
 */
const userFormRef = useTemplateRef<UserFormExpose>('userFormRef')

/**
 * 选中列 Key 列表
 */
const checkedRowKeys = ref<DataTableRowKey[]>([])

/**
 * 搜索
 */
const search = reactive<{
  loading: boolean
  params: UserParams
  sorter: DataTableSorter | null
}>({
  loading: false,

  /**
   * 查询参数
   */
  params: new UserParams(),

  /**
   * 排序
   */
  sorter: null,
})

/**
 * 弹窗表单
 */
const modalForm = reactive<{
  visible: boolean
  loading: boolean
  operationType: OperationTypeValue
  user: User | null
  title: string
}>({
  // 是否显示
  visible: false,

  // 加载中
  loading: false,

  // 操作类型
  operationType: OperationType.Add,

  /**
   * 当前选择行数据
   */
  user: null,

  // 弹窗标题
  get title() {
    return this.operationType + ' - 用户'
  },
})

interface PaginationConfig extends DataTablePaginationBasicConfig {
  onUpdatePage(page: number): void
  onUpdatePageSize(pageSize: number): void
}

/**
 * 分页配置
 */
const pagination = reactive<PaginationConfig>({
  ...new DataTablePaginationBasicConfig(),
  onUpdatePage(page: number) {
    pagination.page = page
    void getUsers()
  },
  onUpdatePageSize(pageSize: number) {
    pagination.pageSize = pageSize
    pagination.page = 1
    void getUsers()
  },
})

void getUsers()

// 获取用户
async function getUsers(): Promise<void> {
  search.loading = true
  try {
    const { data, pages, items } = await getUsersApi({
      ...search.params,
      page: pagination.page,
      size: pagination.pageSize,
      sort: search.sorter?.sortString,
    })
    users.value = User.from(data) ?? []
    pagination.pageCount = pages
    pagination.itemCount = items
  } finally {
    search.loading = false
  }
}

/**
 * 编辑用户
 */
function handleEdit(user: User): void {
  modalForm.operationType = OperationType.Edit
  modalForm.user = user
  modalForm.visible = true
}

/**
 * 删除用户
 */
async function handleDelete(user: User): Promise<void> {
  await deleteUserApi(user.id)
  window.$message.success('删除用户成功！')
  void getUsers()
}

// 搜索
function onSearch(): void {
  pagination.page = 1
  void getUsers()
}

// 重置搜索条件
function onReset(): void {
  search.params = new UserParams()
}

// 打开新增弹窗
function onAdd(): void {
  modalForm.operationType = OperationType.Add
  modalForm.user = new User()
  modalForm.visible = true
}

// 批量删除
async function onBatchDelete(): Promise<void> {
  await batchDeleteUserApi(checkedRowKeys.value.map(String))
  window.$message.success('批量删除用户成功！')
  checkedRowKeys.value = []
  void getUsers()
}

// 刷新列表
function onRefresh(): void {
  void getUsers()
}

// 提交表单
async function handleSubmit(): Promise<void> {
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
 */
function onCheckedRowKeys(keys: DataTableRowKey[]): void {
  checkedRowKeys.value = keys
}

/**
 * 排序
 */
function onUpdateSorter(sorter: DataTableSortState | DataTableSortState[] | null): void {
  const current = Array.isArray(sorter) ? sorter[0] : sorter
  search.sorter = new DataTableSorter({
    columnKey: current?.columnKey !== undefined && current?.columnKey !== null ? String(current.columnKey) : null,
    order: current?.order ?? null,
  })
  void getUsers()
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
      preset="dialog"
      negative-text="取消"
      positive-text="确认"
      style="width: 50vw; max-width: 700px"
      auto-focus
      trap-focus
      @positive-click="handleSubmit"
    >
      <UserFrom ref="userFormRef" :user="modalForm.user" :operation-type="modalForm.operationType" />
    </n-modal>
  </n-flex>
</template>
