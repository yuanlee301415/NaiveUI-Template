<script setup>
import { ref } from 'vue'

defineOptions({ name: 'NaiveIndex' })

const date = ref(Date.now())
</script>

<template>
  <div>
    <h1>Naive</h1>

    <h2>样式</h2>
    <n-flex size="large">
      <n-button>Default</n-button>
      <n-button type="tertiary"> Tertiary </n-button>
      <n-button type="primary"> Primary </n-button>
      <n-button type="info"> Info </n-button>
      <n-button type="success"> Success </n-button>
      <n-button type="warning"> Warning </n-button>
      <n-button type="error"> Error </n-button>
    </n-flex>

    <hr />
    <h2>国际化</h2>
    <n-popconfirm>
      <template #trigger>
        <n-button>引用</n-button>
      </template>
      一切都将一去杳然，任何人都无法将其捕获。
    </n-popconfirm>

    <hr />
    <h2>日期际化</h2>
    <n-date-picker v-model:value="date" type="date" />
  </div>
</template>
