<script setup>
import { useRouter } from 'vue-router'
import { HOME_ROUTE_NAME } from '@/router/constants.js'

const router = useRouter()
</script>

<template>
  <n-result title="404" description="资源不存在">
    <template #icon>
      <SvgIcon local-icon="not-found" class="text-500px" />
    </template>
    <template #footer>
      <n-flex justify="center" :size="20">
        <n-button @click="router.replace({name: HOME_ROUTE_NAME})">返回首页</n-button>
        <n-button @click="router.go(-1)">返回上一页</n-button>
      </n-flex>
    </template>
  </n-result>
</template>

<style scoped lang="less">

</style>
