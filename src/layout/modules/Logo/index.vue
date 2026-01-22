<script setup>
defineOptions({ name: 'LayoutLogo' })

const NAME = import.meta.env.VITE_APP_TITLE
</script>

<template>
  <n-flex class="header-logo" align="center">
    <img src="@/assets/logo.svg" width="40" />
    <n-h3 class="m-0">{{ NAME }}</n-h3>
  </n-flex>
</template>

<style scoped lang="less">
.header-logo {
  width: calc(var(--sider-width) - 10px);
}
</style>
