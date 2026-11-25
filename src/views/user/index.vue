<script setup lang="ts">
import { useAuthStore } from '@/stores/index'

defineOptions({ name: 'UserIndex' })

const authStore = useAuthStore()
</script>

<template>
  <div class="user-view">
    <h1>User</h1>
    <n-h1 v-if="authStore.user.name">Hello, {{ authStore.user.name }}</n-h1>
  </div>
</template>
