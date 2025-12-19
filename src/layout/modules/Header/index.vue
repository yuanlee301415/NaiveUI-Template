<script setup>
import {useRouter} from 'vue-router'
import {useAuthUserStore} from '@/stores/modules/authUser/index.js'
import {LOGIN_ROUTE_NAME} from '@/router/constants.js'

const authUserStore = useAuthUserStore()
const router = useRouter()
</script>

<template>
  <header class="flex justify-between">
    <n-h2>Header</n-h2>
    <n-flex size="medium">
      <n-button v-if="authUserStore.user.name">{{ authUserStore.user.name }}</n-button>
      <n-button v-else text @click="router.push({name: LOGIN_ROUTE_NAME})">[登录]</n-button>
    </n-flex>
  </header>
</template>

<style scoped lang="less">

</style>
