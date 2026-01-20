<script setup>
import { useCountdown } from '@/hooks/useCountdown.js'

defineOptions({ name: 'TestCountdown' })

const { seconds, countdown, isCounting, reset, display } = useCountdown(1000 * 5)
</script>

<template>
  <n-card title="Countdown">
    <n-flex size="large">
      <n-button @click="countdown">{{ seconds }}</n-button>
      <n-button @click="countdown">{{ display }}</n-button>
      <n-button :disabled="isCounting" @click="countdown">{{ seconds }}</n-button>
      <n-button @click="reset()">Reset</n-button>
    </n-flex>
  </n-card>
</template>
