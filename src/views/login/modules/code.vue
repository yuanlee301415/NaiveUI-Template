<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRouteStore } from '@/stores/modules/route/index.js'
import { getCaptchaApi } from '@/api/rights.js'
import { useAuthStore } from '@/stores/modules/auth/index.js'
import { LOGIN_PASSWORD_ROUTE_NAME } from '@/router/constants.js'
import { useFormRules } from '@/hooks/useFormRules.js'
import { noSideSpace } from '@/utils/naiveUI.js'
import { useCountdown } from '@/hooks/useCountdown.js'

defineOptions({ name: 'CodeLogin' })

const router = useRouter()
const routeStore = useRouteStore()
const authStore = useAuthStore()
const { createPhoneRules, createCodeFourRules, createRuleMessage } = useFormRules()
const { phoneMessage } = createRuleMessage()
const { seconds, countdown, isCounting } = useCountdown(5000)

const rules = {
  phone: createPhoneRules({ key: 'phone' }),
  code: createCodeFourRules(),
}

const formData = reactive({
  phone: '',
  code: [],
})

const loading = ref(false)

const formRef = ref(null)

let captcha = null

async function handleGetCaptcha() {
  await formRef.value?.validate(null, (rule) => rule.key === 'phone')
  countdown()
  captcha = await getCaptchaApi(formData.phone)
  formData.code = captcha.code.split('')
}

async function handleSubmit() {
  await formRef.value?.validate()
  loading.value = true
  try {
    await authStore.login({ login: captcha.name })
    window.$notification.success({ content: '欢迎回来！', title: '登录成功', duration: 3000 })
    routeStore.redirectFormLogin()
  } catch (e) {
    console.error(e)
    window.$message.error('手机号或验证码错误！')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-w-600px">
    <n-h2 class="text-center">
      <n-text type="success">验证码登录</n-text>
    </n-h2>

    <n-form ref="formRef" :model="formData" :rules="rules" size="large" @keyup.enter="handleSubmit">
      <n-form-item label="手机号" path="phone">
        <n-input v-model:value="formData.phone" :allow-input="noSideSpace" :placeholder="phoneMessage.requiredMessage" maxlength="11" />
      </n-form-item>

      <n-form-item label="验证码" path="code">
        <n-input-otp v-model:value="formData.code" :length="4" />

        <div class="w-150px ml-4">
          <n-button v-if="isCounting" class="w-full" disabled> {{ seconds }}秒后重新获取 </n-button>
          <n-button v-else class="w-full" @click="handleGetCaptcha">获取验证码</n-button>
        </div>
      </n-form-item>
    </n-form>

    <n-flex :size="[0, 30]" justify="right">
      <n-button :loading="loading" type="primary" round block size="large" @click="handleSubmit">确认 </n-button>
      <n-button round block size="large" @click="router.push({ name: LOGIN_PASSWORD_ROUTE_NAME })">返回 </n-button>
    </n-flex>
  </div>
</template>
