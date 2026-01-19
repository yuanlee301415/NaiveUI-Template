<script setup>
import { reactive, ref, onBeforeUnmount, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getCaptchaApi } from '@/api/rights.js'
import { LOGIN_PASSWORD_ROUTE_NAME, LOGIN_CODE_ROUTE_NAME } from '@/router/constants.js'
import { useFormRules } from '@/hooks/useFormRules.js'
import { noSideSpace } from '@/utils/naiveUI.js'

// eslint-disable-next-line vue/multi-word-component-names
defineOptions({ name: 'Register' })

const router = useRouter()

const formData = reactive({
  phone: '',
  code: [],
  password: '',
  confirmPassword: '',
  email: ''
})

const { createPhoneRules, createCodeFourRules, createPasswordRules, createConfirmPasswordRules, createEmailRules, createRuleMessage } = useFormRules()
const { phoneMessage, passwordMessage, confirmPasswordMessage, emailMessage } = createRuleMessage()

const rules = computed(() => {
  return {
    phone: createPhoneRules({ key: 'phone' }),
    code: createCodeFourRules(),
    password: createPasswordRules(),
    confirmPassword: createConfirmPasswordRules({ password: formData.password }),
    email: createEmailRules({ required: false })
  }
})

const countdownRest = ref(0)

const formRef = ref(null)

let countdownTimer = null


function countdown(seconds = 10) {
  countdownRest.value = seconds
  countdownTimer = setInterval(() => {
    countdownRest.value = --seconds
    if (seconds === 0) {
      clearInterval(countdownTimer)
    }
  }, 1000)
}

async function handleGetCaptcha() {
  await formRef.value?.validate(null, (rule) => rule.key === 'phone')
  countdown()
  const captcha = await getCaptchaApi(formData.phone)
  formData.code = captcha.code.split('')
}

async function handleSubmit() {
  console.log(formData)
  await formRef.value?.validate()
  window.$toastSuccess('注册成功')
  router.push({ name: LOGIN_CODE_ROUTE_NAME })
}

onBeforeUnmount(() => {
  clearInterval(countdownTimer)
})
</script>

<template>
  <div class="min-w-600px">
    <n-h2 class="text-center">
      <n-text type="success">注册帐号</n-text>
    </n-h2>

    <n-form ref="formRef" :model="formData" :rules="rules" size="large" @keyup.enter="handleSubmit">
      <n-form-item label="手机号" path="phone">
        <n-input
          v-model:value="formData.phone"
          :allow-input="noSideSpace"
          :placeholder="phoneMessage.requiredMessage"
          maxlength="11"
        />
      </n-form-item>

      <n-form-item label="验证码" path="code">
        <n-input-otp v-model:value="formData.code" :length="4" />

        <div class="w-150px ml-4">
          <n-button v-if="countdownRest" class="w-full" disabled
          >{{ countdownRest }}秒后重新获取
          </n-button
          >
          <n-button v-else class="w-full" @click="handleGetCaptcha">获取验证码</n-button>
        </div>
      </n-form-item>

      <n-form-item label="密码" path="password">
        <n-input
          v-model:value="formData.password"
          :allow-input="noSideSpace"
          :placeholder="passwordMessage.requiredMessage"
          type="password"
          maxlength="20"
        />
      </n-form-item>

      <n-form-item label="确认密码" path="confirmPassword">
        <n-input
          v-model:value="formData.confirmPassword"
          :allow-input="noSideSpace"
          :placeholder="confirmPasswordMessage.requiredMessage"
          type="password"
          maxlength="20"
        />
      </n-form-item>

      <n-form-item label="邮箱" path="email">
        <n-input
          v-model:value="formData.email"
          :allow-input="noSideSpace"
          :placeholder="emailMessage.requiredMessage"
          maxlength="50"
        />
      </n-form-item>
    </n-form>

    <n-flex :size="[0, 30]" justify="right">
      <n-button type="primary" round block size="large" @click="handleSubmit">确认</n-button>
      <n-button round block size="large" @click="router.push({ name: LOGIN_PASSWORD_ROUTE_NAME })"
      >返回
      </n-button
      >
    </n-flex>
  </div>
</template>
