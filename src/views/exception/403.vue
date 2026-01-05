<script setup>
import { useRouter } from 'vue-router'
import { HOME_ROUTE_NAME } from '@/router/constants.js'

defineOptions({ name: 'Exception_403' })

const router = useRouter()
</script>

<template>
  <n-layout style="height: 100%">
    <n-el tag="div" style="color: var(--base-color)" class="size-full flex-center">
      <n-result title="403" description="无权限">
        <template #icon>
          <SvgIcon local-icon="no-permission" class="text-500px" />
        </template>
        <template #footer>
          <n-flex justify="center" :size="20">
            <n-button @click="router.replace({ name: HOME_ROUTE_NAME })">返回首页</n-button>
            <n-button @click="router.go(-1)">返回上一页</n-button>
          </n-flex>
        </template>
      </n-result>
    </n-el>
  </n-layout>
</template>
