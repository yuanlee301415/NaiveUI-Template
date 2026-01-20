<!--
DataTable 表头操作
- 新增
- 批量删除
- 刷新
-->
<script setup>
defineOptions({ name: 'TableHeaderOperation' })

defineProps({
  // 是否禁用“批量删除”
  disabledDelete: {
    type: Boolean,
  },

  loading: {
    type: Boolean,
  },
})

/**
 * @type {EmitFn<('add'|'batchDelete'|'refresh')[]>}
 */
const emit = defineEmits(['add', 'batchDelete', 'refresh'])
</script>

<template>
  <n-flex size="medium">
    <slot name="prefix" />

    <n-button tertiary @click="emit('add')">
      <template #icon>
        <SvgIcon icon="i-mdi:plus" />
      </template>
      新增
    </n-button>

    <n-popconfirm @positive-click="emit('batchDelete')">
      确认批量删除？
      <template #trigger>
        <n-button :disabled="disabledDelete" tertiary type="error">
          <template #icon>
            <SvgIcon icon="i-mdi:trash-can-outline" />
          </template>
          批量删除
        </n-button>
      </template>
    </n-popconfirm>

    <n-button :loading="loading" tertiary @click="emit('refresh')">
      <template #icon>
        <SvgIcon icon="i-mdi:refresh" />
      </template>
      刷新
    </n-button>
  </n-flex>
</template>
