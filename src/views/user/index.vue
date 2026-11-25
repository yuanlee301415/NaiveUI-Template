<script setup lang="ts">
import { useAuthStore } from '@/stores'

defineOptions({ name: 'UserIndex' })

const authStore = useAuthStore()
</script>

<template>
  <div class="user-view">
    <h1>User</h1>

    <!-- 本地 SVG sprite 图标示例（图标目录：src/assets/svg-icons/） -->
    <n-flex align="center" :size="12">
      <SvgIcon local-icon="avatar" class="text-80px" />
      <n-h1 v-if="authStore.user.name" class="m-0">Hello, {{ authStore.user.name }}</n-h1>
    </n-flex>
  </div>
</template>
