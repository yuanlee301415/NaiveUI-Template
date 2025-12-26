<script setup>
import { reactive, ref } from 'vue'
import { useNotification } from 'naive-ui'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/modules/auth/index.js'
import { useRouteStore } from '@/stores/modules/route/index.js'
import { LOGIN_CODE_ROUTE_NAME, LOGIN_REGISTER_ROUTE_NAME } from '@/router/constants.js'

const router = useRouter()
const authStore = useAuthStore()
const routeStore = useRouteStore()
const notification = useNotification()
const NAME_REG = /^[a-z\d]{3,20}$/

const RULES = {
  name: {
    required: true,
    trigger: 'blur',
    validator(rule, value) {
      if (!value || !value.length) return new Error('请输入用户名')
      if (value.length < 3) return new Error('用户名最少3位字符')
      if (!NAME_REG.test(value)) return new Error('用户名只允许字母数字')
      return true
    }
  },
  password: {
    required: true,
    trigger: 'blur',
    message: '请输入密码'
  }
}

const formData = reactive({
  name: '',
  password: ''
})

const loading = ref(false)

const formRef = ref(null)

function noSideSpace(value) {
  return !value.startsWith(' ') && !value.endsWith(' ')
}

async function handleSubmit() {
  await formRef.value?.validate()
  loading.value = true
  try {
    const user = await authStore.login(formData)
    notification.success({
      title: '登录成功',
      content: `欢迎回来，${user.name}！`,
      duration: 1000
    })
    routeStore.redirectFormLogin()
  } catch (e) {
    console.error(e)
    notification.error({
      content: '用户名或密码错误！'
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-w-600px">

    <n-h2 class="text-center">
      <n-text type="success">密码登录</n-text>
    </n-h2>

    <n-form ref="formRef" :model="formData" :rules="RULES" size="large" @keyup.enter="handleSubmit">
      <n-form-item label="用户名" path="name">
        <n-input v-model:value="formData.name" :allow-input="noSideSpace" maxlength="10" placeholder="请输入用户名" />
      </n-form-item>

      <n-form-item label="密码" path="password">
        <n-input v-model:value="formData.password" :allow-input="noSideSpace" type="password" maxlength="20" placeholder="请输入密码" />
      </n-form-item>

      <n-flex :size="[0, 30]">
        <n-button :loading="loading" type="primary" round block size="large" @click="handleSubmit">
          确认
        </n-button>

        <n-flex :size="15" class="w-full flex-y-center justify-between">
          <n-button block size="large" class="flex-1" @click="router.push({ name: LOGIN_CODE_ROUTE_NAME })">验证码登录</n-button>
          <n-button block size="large" class="flex-1" @click="router.push({ name: LOGIN_REGISTER_ROUTE_NAME })">注册帐号</n-button>
        </n-flex>
      </n-flex>

    </n-form>
  </div>
</template>
