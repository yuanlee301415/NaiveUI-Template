<!--
用户表单
-->

<script setup>
import { User } from '@/models/index.js'
import { reactive, ref } from 'vue'
import { Gender, UsingStatus, OperationType } from '@/enum/index.js'
import { PHONE_REG, USER_NAME_REG, EMAIL_REG } from '@/constants/reg.js'
import { createUserApi, updateUserApi } from '@/api/user.js'

defineOptions({ name: 'UserForm' })

const { user, operationType } = defineProps({
  /**
   * @type {User}
   */
  user: {
    type: User
  },

  /**
   * @type {OperationType}
   */
  operationType: {
    type: String
  }
})

/**
 * @type {User}
 */
const model = reactive(new User({
  id: user.id,
  login: user.login,
  name: user.name,
  phone: user.phone,
  email: user.email,
  gender: user.gender,
  status: user.status
}))

/**
 * @type {Ref<HTMLFormElement | null>}
 */
const formRef = ref()

const RULES = {
  name: {
    required: true,
    trigger: 'blur',
    validator(rule, value) {
      if (!value || !value.length) return new Error('请输入用户名')
      if (!USER_NAME_REG.test(value)) return new Error('用户名只允许：4-6位中英文、数字、字母字符')
      return true
    }
  },
  phone: [
    {
      required: true,
      trigger: 'blur',
      validator(rule, value) {
        if (!value) return new Error('请输入手机号')
        if (!PHONE_REG.test(value)) return new Error('手机号格式错误')
        return true
      }
    }
  ],
  email: [
    {
      trigger: 'blur',
      validator(rule, value) {
        if (!value) return
        if (!EMAIL_REG.test(value)) return new Error('手机号格式错误')
        return true
      }
    }
  ]
}

// 提交表单
async function submit() {
  await formRef.value?.validate()
  switch (operationType) {
    case OperationType.Add:
      await createUserApi(model)
      break
    case OperationType.Edit:
      await updateUserApi(model)
      break
  }
  window.$notification.success({ content: operationType + '用户成功！', duration: 5000 })
}

defineExpose({
  submit
})
</script>


<template>
  <n-form :model="model" :rules="RULES" ref="formRef">
    <n-form-item v-if="operationType === OperationType.Edit" path="login" :label="User.LOGIN_LABEL">
      <n-input v-model:value="model.login" disabled />
    </n-form-item>

    <n-form-item path="name" :label="User.NAME_LABEL">
      <n-input v-model:value="model.name" maxlength="16" />
    </n-form-item>

    <n-form-item path="phone" :label="User.PHONE_LABEL">
      <n-input v-model:value="model.phone" maxlength="11" />
    </n-form-item>

    <n-form-item path="email" :label="User.EMAIL_LABEL">
      <n-input v-model:value="model.email" maxlength="30" />
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
