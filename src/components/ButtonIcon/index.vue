<script setup>
import { twMerge } from 'tailwind-merge'

defineOptions({ name: 'ButtonIcon', inheritAttrs: false })

const DEFAULT_CLASS = ['text-2xl']

defineProps({
  icon: {
    type: String,
  },

  tooltipPlacement: {
    type: String,
    default: 'bottom',
  },

  tooltipContent: {
    type: String,
  },

  zIndex: {
    type: Number,
    default: 99,
  },

  buttonClass: {
    type: String,
  },
})
</script>

<template>
  <n-tooltip :placement="tooltipPlacement" :z-index="zIndex">
    <template #trigger>
      <n-button v-bind="$attrs" :class="twMerge(DEFAULT_CLASS, buttonClass)" quaternary>
        <div class="flex-center gap-8px">
          <slot>
            <SvgIcon :icon="icon" />
          </slot>
        </div>
      </n-button>
    </template>
    {{ tooltipContent }}
  </n-tooltip>
</template>

<style scoped lang="less"></style>
