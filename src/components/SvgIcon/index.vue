<script setup>
import { computed, useAttrs } from 'vue'

defineOptions({ name: 'SvgIcon', inheritAttrs: false })

const props = defineProps({
  icon: {
    type: String,
    default: ''
  },
  localIcon: {
    type: String,
    default: ''
  }
})

const bindAttrs = useAttrs()

const isLocalIcon = computed(() => props.localIcon || !props.icon)

const symbolId = computed(() => {
  const { VITE_ICON_LOCAL_PREFIX: prefix } = import.meta.env
  const icon = props.localIcon || 'no-icon'
  return `#${prefix}-${icon}`
})

</script>

<template>
  <template v-if="isLocalIcon">
    <svg aria-hidden="true" width="1em" height="1em" v-bind="bindAttrs">
      <use :xlink:href="symbolId" fill="currentColor" />
    </svg>
  </template>
  <template v-else>
    <i v-if="icon" :class="icon" v-bind="bindAttrs" />
  </template>
</template>

<style scoped lang="less">

</style>
