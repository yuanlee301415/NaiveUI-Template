<script setup>
import { useRouter } from 'vue-router'
import { HOME_ROUTE_NAME } from '@/router/constants.js'

const router = useRouter()
</script>

<template>
  <n-result status="403" title="403" description="无权限">
    <template #footer>
      <n-flex justify="center" :size="20">
        <n-button @click="router.replace({name: HOME_ROUTE_NAME })">返回首页</n-button>
        <n-button @click="router.go(-1)">返回上一页</n-button>
      </n-flex>
    </template>
  </n-result>
</template>

<style scoped lang="less">

</style>
