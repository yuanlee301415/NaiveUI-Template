<script setup>
import { reactive, ref, onBeforeUnmount, computed } from 'vue'
import { useNotification } from 'naive-ui'
import { useRouter } from 'vue-router'
import { getCaptchaApi } from '@/api/rights.js'
import { LOGIN_PASSWORD_ROUTE_NAME, LOGIN_CODE_ROUTE_NAME } from '@/router/constants.js'

// eslint-disable-next-line vue/multi-word-component-names
defineOptions({ name: 'Register' })

const router = useRouter()
const notification = useNotification()
const MOBILE_REG = /^1\d{10}$/
const CODE_REG = /^\d{4}$/

const formData = reactive({
  mobile: '',
  code: '',
  password: '',
  confirmPassword: ''
})

const createConfirmPasswordRule = (password) => {
  return [
    {
      required: true,
      message: '请再次输入密码'
    },
    {
      trigger: 'input',
      asyncValidator(rule, value) {
        if (value && value !== password) return Promise.reject(rule.message)
        return Promise.resolve()
      },
      message: '再次密码不一致'
    }
  ]
}

const rules = computed(() => ({
    mobile: [
      {
        key: 'mobile',
        required: true,
        trigger: 'blur',
        validator(rule, value) {
          if (!value) return new Error('请输入手机号')
          if (!MOBILE_REG.test(value)) return new Error('手机号格式错误')
          return true
        }
      }
    ],
    code: [
      {
        required: true,
        message: '请输入验证码'
      },
      {
        pattern: CODE_REG,
        trigger: 'blur',
        message: '验证码格式错误'
      }],
    password: [
      {
        required: true,
        trigger: 'blur',
        validator(rule, value) {
          if (!value) return new Error('请输入密码')
          if (value.length < 4 || value.length > 16) return new Error('密码格式错误，4-16位字符，包含字母、数字、下划线')
          return true
        }
      }
    ],
    confirmPassword: createConfirmPasswordRule(formData.password)
  }
))

const countdownRest = ref(0)

const formRef = ref(null)

let countdownTimer = null

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
  await formRef.value?.validate(null, rule => {
    console.log('rule:', rule)
    return rule.key === 'mobile'
  })
  countdown()
  const captcha = await getCaptchaApi(formData.mobile)
  formData.code = captcha.code
}

async function handleSubmit() {
  await formRef.value?.validate()

  notification.success({
    title: '注册成功',
    duration: 1000
  })

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
      <n-form-item label="手机号" path="mobile">
        <n-input v-model:value="formData.mobile" :allow-input="noSideSpace" maxlength="11" placeholder="请输入手机号" />
      </n-form-item>

      <n-form-item label="验证码" path="code">
        <n-input v-model:value="formData.code" :allow-input="noSideSpace" class="flex-1" maxlength="4" placeholder="请输入验证码" />

        <div class="w-150px ml-4">
          <n-button v-if="countdownRest" class="w-full" disabled>{{ countdownRest }}秒后重新获取</n-button>
          <n-button v-else class="w-full" @click="handleGetCaptcha">获取验证码</n-button>
        </div>
      </n-form-item>

      <n-form-item label="密码" path="password">
        <n-input v-model:value="formData.password" :allow-input="noSideSpace" type="password" maxlength="20" placeholder="请输入密码" />
      </n-form-item>

      <n-form-item label="确认密码" path="confirmPassword">
        <n-input v-model:value="formData.confirmPassword" :allow-input="noSideSpace" type="password" maxlength="20" placeholder="请再次输入密码" />
      </n-form-item>
    </n-form>

    <n-flex :size="[0, 30]" justify="right">
      <n-button type="primary" round block size="large" @click="handleSubmit">确认</n-button>
      <n-button round block size="large" @click="router.push({name: LOGIN_PASSWORD_ROUTE_NAME })">返回</n-button>
    </n-flex>
  </div>
</template>
