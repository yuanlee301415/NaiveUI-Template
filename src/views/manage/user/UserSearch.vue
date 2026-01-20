<!--
用户搜索
-->

<script setup>
import { User } from '@/models'
import { UsingStatus, Gender } from '@/enum/index.js'

defineOptions({ name: 'UserSearch' })

defineProps({
  loading: Boolean,
})

/**
 * @type {UserParams}
 */
const model = defineModel('params', { required: true })

/**
 * 事件
 * - search: 搜索
 * - reset: 重置搜索条件
 * @type {EmitFn<('search' | 'reset')[]>}
 */
const emit = defineEmits(['search', 'reset'])
</script>

<template>
  <n-card :bordered="false" size="small">
    <n-form :model="model" ref="formRef" label-placement="left" label-width="80">
      <n-grid responsive="screen" item-responsive>
        <n-form-item-gi span="24 sm:12 m:6" path="login" :label="User.LOGIN_LABEL">
          <n-input v-model:value="model.login" clearable />
        </n-form-item-gi>

        <n-form-item-gi span="24 sm:12 m:6" path="name" :label="User.NAME_LABEL">
          <n-input v-model:value="model.name" clearable />
        </n-form-item-gi>

        <n-form-item-gi span="24 sm:12 m:6" path="phone" :label="User.PHONE_LABEL">
          <n-input v-model:value="model.phone" clearable />
        </n-form-item-gi>

        <n-form-item-gi span="24 sm:12 m:6" path="email" :label="User.EMAIL_LABEL">
          <n-input v-model:value="model.email" clearable />
        </n-form-item-gi>

        <n-form-item-gi span="24 sm:12 m:6" path="status" :label="User.STATUS_LABEL">
          <n-select v-model:value="model.status" :options="[...UsingStatus]" clearable />
        </n-form-item-gi>

        <n-form-item-gi span="24 sm:12 m:6" path="gender" :label="User.GENDER_LABEL">
          <n-select v-model:value="model.gender" :options="[...Gender]" clearable />
        </n-form-item-gi>

        <n-form-item-gi span="24 sm:12 m:12">
          <n-flex justify="end" class="w-full">
            <n-button tertiary @click="emit('reset')">
              <template #icon>
                <SvgIcon icon="i-mdi:refresh" />
              </template>
              重置
            </n-button>

            <n-button tertiary type="primary" :loading="loading" @click="emit('search')">
              <template #icon>
                <SvgIcon icon="i-mdi:magnify" />
              </template>
              搜索
            </n-button>
          </n-flex>
        </n-form-item-gi>
      </n-grid>
    </n-form>
  </n-card>
</template>
