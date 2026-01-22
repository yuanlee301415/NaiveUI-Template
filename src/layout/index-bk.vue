<script setup>
import Header from './modules/Header/index.vue'
import Sider from './modules/Sider/index.vue'

defineOptions({ name: 'LayoutIndex' })
</script>

<template>
  <n-layout style="height: 100%">
    <n-layout-header style="height: 80px; padding: 10px" bordered>
      <Header />
    </n-layout-header>

    <n-layout position="absolute" style="top: 80px; bottom: 60px" has-sider>
      <n-layout-sider
        :width="300"
        :collapsed-width="90"
        :collapsed-icon-size="30"
        :native-scrollbar="false"
        collapse-mode="width"
        show-trigger="arrow-circle"
        content-style="padding: 20px;"
        bordered
      >
        <Sider />
      </n-layout-sider>

      <n-layout content-style="padding: 20px;height:100%;" :native-scrollbar="false">
        <RouterView v-slot="{ Component, route }">
          <transition name="fade-slide" mode="out-in">
            <component :is="Component" :key="route.path" />
          </transition>
        </RouterView>
      </n-layout>
    </n-layout>

    <n-layout-footer position="absolute" style="height: 60px; padding: 10px" bordered>
      <n-h2>Footer</n-h2>
    </n-layout-footer>
  </n-layout>
</template>

<style scoped lang="less"></style>
