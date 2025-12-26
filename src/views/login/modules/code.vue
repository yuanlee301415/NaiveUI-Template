<script setup>
import { reactive, ref, onBeforeUnmount } from 'vue'
import { useNotification } from 'naive-ui'
import { useRouter } from 'vue-router'
import { useRouteStore } from '@/stores/modules/route/index.js'
import { getCaptchaApi } from '@/api/rights.js'
import { useAuthStore } from '@/stores/modules/auth/index.js'
import { LOGIN_PASSWORD_ROUTE_NAME } from '@/router/constants.js'

defineOptions({ name: 'CodeLogin' })

const router = useRouter()
const routeStore = useRouteStore()
const authStore = useAuthStore()
const notification = useNotification()
const MOBILE_REG = /^1\d{10}$/
const CODE_REG = /^\d{4}$/

const RULES = {
  mobile: {
    key: 'mobile',
    required: true,
    trigger: 'blur',
    validator(rule, value) {
      if (!value || !value.length) return new Error('请输入手机号')
      if (value.length !== 11) return new Error('手机号长度错误')
      if (!MOBILE_REG.test(value)) return new Error('手机号格式错误')
      return true
    },
  },
  code: {
    required: true,
    trigger: 'blur',
    validator(rule, value) {
      if (!value || !value.length) return new Error('请输入验证码')
      if (value.length !== 4) return new Error('验证码长度错误')
      if (!CODE_REG.test(value)) return new Error('验证码格式错误')
      return true
    },
  },
}

const formData = reactive({
  mobile: '',
  code: '',
})

const loading = ref(false)

const countdownRest = ref(0)

const formRef = ref(null)

let countdownTimer = null

let captcha = null

function noSideSpace(value) {
  return !value.startsWith(' ') && !value.endsWith(' ')
}

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
  await formRef.value?.validate(null, (rule) => rule.key === 'mobile')
  countdown()
  captcha = await getCaptchaApi(formData.mobile)
  formData.code = captcha.code
}

async function handleSubmit() {
  await formRef.value?.validate()
  loading.value = true
  try {
    const user = await authStore.login({ name: captcha.name })
    notification.success({
      title: '登录成功',
      content: `欢迎回来，${user.name}！`,
      duration: 1000,
    })
    routeStore.redirectFormLogin()
  } catch (e) {
    console.error(e)
    notification.error({
      content: '手机号或验证码错误！',
    })
  } finally {
    loading.value = false
  }
}

onBeforeUnmount(() => {
  clearInterval(countdownTimer)
})
</script>

<template>
  <div class="min-w-600px">
    <n-h2 class="text-center">
      <n-text type="success">验证码登录</n-text>
    </n-h2>

    <n-form ref="formRef" :model="formData" :rules="RULES" size="large" @keyup.enter="handleSubmit">
      <n-form-item label="手机号" path="mobile">
        <n-input
          v-model:value="formData.mobile"
          :allow-input="noSideSpace"
          maxlength="11"
          placeholder="请输入手机号"
        />
      </n-form-item>

      <n-form-item label="验证码" path="code">
        <n-input
          v-model:value="formData.code"
          :allow-input="noSideSpace"
          class="flex-1"
          maxlength="4"
          placeholder="请输入验证码"
        />

        <div class="w-150px ml-4">
          <n-button v-if="countdownRest" class="w-full" disabled
            >{{ countdownRest }}秒后重新获取</n-button
          >
          <n-button v-else class="w-full" @click="handleGetCaptcha">获取验证码</n-button>
        </div>
      </n-form-item>
    </n-form>

    <n-flex :size="[0, 30]" justify="right">
      <n-button :loading="loading" type="primary" round block size="large" @click="handleSubmit"
        >确认</n-button
      >
      <n-button round block size="large" @click="router.push({ name: LOGIN_PASSWORD_ROUTE_NAME })"
        >返回</n-button
      >
    </n-flex>
  </div>
</template>
