<script setup lang="ts">
import { useRouter } from 'vue-router'
import { HOME_ROUTE_NAME } from '@/router/constants'
import noPermissionUrl from '@/assets/images/no-permission.svg?url'

defineOptions({ name: 'ExceptionPage403' })

const router = useRouter()
</script>

<template>
  <n-layout style="height: 100%">
    <n-el tag="div" class="size-full flex-center">
      <n-result title="403" description="无权限">
        <template #icon>
          <!-- 插画体积较大，作为独立资源按需加载，不进入首屏 SVG sprite -->
          <img :src="noPermissionUrl" alt="无权限" class="w-500px h-500px" />
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
