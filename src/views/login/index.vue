<script setup>
import WaveBg from '@/components/WaveBg.vue'

defineOptions({ name: 'LoginIndex' })
</script>

<template>
  <div class="w-full h-full flex-center relative overflow-hidden bg-[#e5e0ff]">
    <WaveBg/>
    <n-card class="w-auto relative z-10 rounded-20px p-20px">
      <RouterView v-slot="{ Component, route }">
        <transition name="fade-slide" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </RouterView>
    </n-card>
  </div>
</template>
