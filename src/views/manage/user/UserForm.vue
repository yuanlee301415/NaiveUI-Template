<!--
用户表单
-->

<script lang="ts">
import type { FormInst, FormRules } from 'naive-ui'
import type { OperationTypeValue } from '@/enum'
import { User } from '@/models'
import { Gender, UsingStatus, OperationType } from '@/enum'
import { createUserApi, updateUserApi } from '@/api/user'

/** UserForm 通过 `defineExpose` 暴露给父组件的方法 */
export interface UserFormExpose {
  /** 校验并提交表单 */
  submit(): Promise<void>
}
</script>

<script setup lang="ts">
import { reactive, useTemplateRef } from 'vue'
import { useFormRules } from '@/hooks'

defineOptions({ name: 'UserForm' })

const { user, operationType } = defineProps<{
  user: User | null
  operationType: OperationTypeValue
}>()

const { createNickNameRules, createPhoneRules, createEmailRules, createRuleMessage } = useFormRules()
const { loginNameMessage, nickNameMessage, phoneMessage, emailMessage } = createRuleMessage()
const model = reactive(
  new User({
    id: user?.id,
    login: user?.login,
    name: user?.name,
    phone: user?.phone,
    email: user?.email,
    gender: user?.gender,
    status: user?.status,
  }),
)

const formRef = useTemplateRef<FormInst>('formRef')

const rules: FormRules = {
  name: createNickNameRules(),
  phone: createPhoneRules(),
  email: createEmailRules(),
}

// 提交表单
async function submit(): Promise<void> {
  await formRef.value?.validate()
  switch (operationType) {
    case OperationType.Add:
      await createUserApi(model)
      break
    case OperationType.Edit:
      await updateUserApi(model)
      break
  }
  window.$message.success(operationType + '用户成功！')
}

defineExpose<UserFormExpose>({
  submit,
})
</script>

<template>
  <n-form ref="formRef" :model="model" :rules="rules">
    <n-form-item v-if="operationType === OperationType.Edit" path="login" :label="User.LOGIN_LABEL">
      <n-input v-model:value="model.login" :placeholder="loginNameMessage.requiredMessage" disabled />
    </n-form-item>

    <n-form-item path="name" :label="User.NAME_LABEL">
      <n-input v-model:value="model.name" :placeholder="nickNameMessage.requiredMessage" maxlength="16" />
    </n-form-item>

    <n-form-item path="phone" :label="User.PHONE_LABEL">
      <n-input v-model:value="model.phone" :placeholder="phoneMessage.requiredMessage" maxlength="11" />
    </n-form-item>

    <n-form-item path="email" :label="User.EMAIL_LABEL">
      <n-input v-model:value="model.email" :placeholder="emailMessage.requiredMessage" maxlength="30" />
    </n-form-item>

    <n-form-item path="gender" :label="User.GENDER_LABEL">
      <n-radio-group v-model:value="model.gender">
        <n-radio v-for="_ of Gender" :key="_.value" :value="_.value" :label="_.label" />
      </n-radio-group>
    </n-form-item>

    <n-form-item path="status" :label="User.STATUS_LABEL">
      <n-radio-group v-model:value="model.status">
        <n-radio v-for="_ of UsingStatus" :key="_.value" :value="_.value" :label="_.label" />
      </n-radio-group>
    </n-form-item>
  </n-form>
</template>
