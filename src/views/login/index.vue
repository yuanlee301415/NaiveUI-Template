<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useNotification } from 'naive-ui'
import { useAuthUserStore } from '@/stores/modules/authUser/index.js'
import { HOME_ROUTE_NAME } from '@/router/constants.js'

const authUserStore = useAuthUserStore()
const notification = useNotification()
const router = useRouter()
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
  await formRef.value.validate()
  loading.value = true
  try {
    const user = await authUserStore.login(formData)
    notification.success({
      title: '登录成功',
      content: `欢迎回来，${user.name}！`,
      duration: 1000
    })
    router.replace({ name: HOME_ROUTE_NAME })
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
  <div class="w-full h-full flex-center bg-gray-500">
    <div class="min-w-600px bg-black rounded-20px p-20px">

      <n-h2 class="text-center">
        <n-text type="success">登录</n-text>
      </n-h2>

      <n-form ref="formRef" :model="formData" :rules="RULES" size="large"
              @keyup.enter="handleSubmit">
        <n-form-item label="用户名" path="name">
          <n-input v-model:value="formData.name" :allow-input="noSideSpace" maxlength="10"
                   placeholder="请输入用户名" />
        </n-form-item>

        <n-form-item label="密码" path="password">
          <n-input v-model:value="formData.password" :allow-input="noSideSpace" type="password"
                   maxlength="20" placeholder="请输入密码" />
        </n-form-item>
      </n-form>

      <n-flex :size="50" justify="right">
        <n-button :loading="loading" @click="handleSubmit">登录</n-button>
      </n-flex>

    </div>
  </div>
</template>
