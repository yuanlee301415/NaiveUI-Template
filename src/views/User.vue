<script setup>
import { useAuthUserStore } from '@/stores/modules/authUser/index.js'

const authUserStore = useAuthUserStore()

</script>

<template>
  <div class="user-view">
    <h1>User</h1>
    <n-h1 v-if="authUserStore.user.name">Hello, {{ authUserStore.user.name }}</n-h1>
  </div>
</template>

<style scoped lang="less">

</style>
