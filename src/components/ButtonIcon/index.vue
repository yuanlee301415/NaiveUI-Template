<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import type { TooltipProps } from 'naive-ui'

defineOptions({ name: 'ButtonIcon', inheritAttrs: false })

const DEFAULT_CLASS = ['text-2xl']

withDefaults(
  defineProps<{
    icon?: string
    tooltipPlacement?: TooltipProps['placement']
    tooltipContent?: string
    zIndex?: number
    buttonClass?: string
  }>(),
  {
    icon: '',
    tooltipPlacement: 'bottom',
    tooltipContent: '',
    zIndex: 99,
    buttonClass: '',
  },
)
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
