<script setup>
import Header from './modules/Header/index.vue'
import Menus from './modules/Menus/index.vue'

</script>

<template>
  <n-layout style="height: 100%">
    <n-layout-header style="height: 80px; padding: 10px" bordered>
      <Header />
    </n-layout-header>

    <n-layout position="absolute" style="top: 80px; bottom: 60px" has-sider>
      <n-layout-sider
        :native-scrollbar="false"
        width="200"
        content-style="padding: 20px;"
        bordered
      >
        <Menus />
      </n-layout-sider>
      <n-layout content-style="padding: 20px;" :native-scrollbar="false">
        <RouterView v-slot="{ Component, route }">
          <transition name="fade-slide" mode="out-in">
            <component :is="Component" :key="route.path" />
          </transition>
        </RouterView>
      </n-layout>
    </n-layout>

    <n-layout-footer
      position="absolute"
      style="height: 60px; padding: 10px"
      bordered
    >
      <n-h2>Footer</n-h2>
    </n-layout-footer>
  </n-layout>
</template>

<style scoped lang="less">

</style>
