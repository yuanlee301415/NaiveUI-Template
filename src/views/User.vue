<script setup>
import { useAuthStore } from '@/stores/modules/auth/index.js'

const authStore = useAuthStore()

</script>

<template>
  <div class="user-view">
    <h1>User</h1>
    <n-h1 v-if="authStore.user.name">Hello, {{ authStore.user.name }}</n-h1>
  </div>
</template>

<style scoped lang="less">

</style>
