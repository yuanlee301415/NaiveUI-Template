<script setup>
import { onMounted, computed } from 'vue'
import { RouterView } from 'vue-router'
import { darkTheme, useOsTheme } from 'naive-ui'

const osTheme = useOsTheme()
const theme = computed(() => osTheme.value === 'dark' ? darkTheme : null)

onMounted(() => {
  const leftStyle =
    'background-color:#2f353a;color:#fff;padding:0 5px;line-height:1.2rem;border-radius:0.2rem 0 0 0.2rem;'
  const rightStyle =
    'background-color:#17a2b8;color:#fff;padding:0 5px;line-height:1.2rem;border-radius:0 0.2rem 0.2rem 0;'
  console.log(`%c MODE %c ${import.meta.env.MODE}`, leftStyle, rightStyle)
  // eslint-disable-next-line no-undef
  console.log(`%c VERSION %c ${__APP_VERSION__}`, leftStyle, rightStyle)
  // eslint-disable-next-line no-undef
  console.log(`%c BUILD_TIME %c ${__APP_BUILD_TIME__}`, leftStyle, rightStyle)
})
</script>

<template>
  <n-config-provider :theme="theme" class="h-full">
    <RouterView />
  </n-config-provider>
</template>

<style scoped lang="less">
header {
  line-height: 1.5;
  max-height: 100vh;

  .logo {
    display: block;
    margin: 0 auto 2rem;
  }

  nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;

    a {
      display: inline-block;
      padding: 0 1rem;
      border-left: 1px solid var(--color-border);

      &.router-link-exact-active {
        color: var(--color-text);
      }

      &.router-link-exact-active:hover {
        background-color: transparent;
      }

      &:first-of-type {
        border: 0;
      }
    }
  }
}
</style>
