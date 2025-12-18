<script setup>
import {useRouter} from 'vue-router'

const router = useRouter()
</script>

<template>
  <n-result status="404" title="404" description="资源不存在">
    <template #footer>
      <n-flex justify="center" :size="20">
        <n-button @click="router.replace('/')">返回首页</n-button>
        <n-button @click="router.go(-1)">返回上一页</n-button>
      </n-flex>
    </template>
  </n-result>
</template>

<style scoped lang="less">

</style>
