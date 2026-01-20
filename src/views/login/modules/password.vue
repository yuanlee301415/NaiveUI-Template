<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/modules/auth/index.js'
import { useRouteStore } from '@/stores/modules/route/index.js'
import { useFormRules } from '@/hooks/useFormRules.js'
import { LOGIN_CODE_ROUTE_NAME, LOGIN_REGISTER_ROUTE_NAME } from '@/router/constants.js'
import { noSideSpace } from '@/utils/naiveUI.js'

defineOptions({ name: 'PasswordLogin' })

const ACCOUNTS = [
  { login: 'super', name: '超级管理员' },
  { login: 'admin', name: '管理员' },
  { login: 'user', name: '普通用户' },
]

const router = useRouter()
const authStore = useAuthStore()
const routeStore = useRouteStore()
const { createLoginNameRules, createPasswordRules, createRuleMessage } = useFormRules()
const { loginNameMessage, passwordMessage } = createRuleMessage()

const rules = {
  login: createLoginNameRules(),
  password: createPasswordRules(),
}

const formData = reactive({
  login: 'admin',
  password: '123456',
})

const loading = ref(false)

const formRef = ref(null)

async function handleSubmit() {
  await formRef.value?.validate()
  loading.value = true
  try {
    await authStore.login(formData)
    window.$toastSuccess('欢迎回来！', '登录成功')
    routeStore.redirectFormLogin()
  } catch (e) {
    console.error(e)
    window.$toastError('用户名或密码错误！', '登录失败')
  } finally {
    loading.value = false
  }
}

function handleGoto(name) {
  router.push({ name })
}

/**
 * 快捷登录
 * @param {string} login
 */
function handleAccountLogin({ login }) {
  formData.login = login
  formData.password = '123456'
  handleSubmit()
}
</script>

<template>
  <div class="min-w-600px">
    <n-h2 class="text-center">
      <n-text type="success">密码登录</n-text>
    </n-h2>

    <n-form ref="formRef" :model="formData" :rules="rules" size="large" @keyup.enter="handleSubmit">
      <n-form-item label="用户名" path="login">
        <n-input v-model:value="formData.login" :allow-input="noSideSpace" :placeholder="loginNameMessage.requiredMessage" maxlength="10" />
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

      <n-flex :size="[0, 30]">
        <n-button :loading="loading" type="primary" round block size="large" @click="handleSubmit"> 确认 </n-button>

        <n-flex :size="15" class="w-full flex-y-center justify-between">
          <n-button block size="large" class="flex-1" @click="handleGoto(LOGIN_CODE_ROUTE_NAME)">验证码登录 </n-button>
          <n-button block size="large" class="flex-1" @click="handleGoto(LOGIN_REGISTER_ROUTE_NAME)">注册帐号 </n-button>
        </n-flex>
      </n-flex>

      <n-divider>快捷登录</n-divider>
      <n-flex :size="15" class="w-full flex-y-center justify-between">
        <n-button v-for="ac of ACCOUNTS" :key="ac.login" block size="large" class="flex-1" @click="handleAccountLogin(ac)">{{ ac.name }} </n-button>
      </n-flex>
    </n-form>
  </div>
</template>
