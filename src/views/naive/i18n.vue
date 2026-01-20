<script setup>
import { ref } from 'vue'

defineOptions({ name: 'NaiveI18n' })

const date = ref(Date.now())
</script>

<template>
  <n-card title="国际化">
    <n-popconfirm>
      <template #trigger>
        <n-button>引用</n-button>
      </template>
      一切都将一去杳然，任何人都无法将其捕获。
    </n-popconfirm>

    <hr />
    <h2>日期际化</h2>
    <n-date-picker v-model:value="date" type="date" />
  </n-card>
</template>
