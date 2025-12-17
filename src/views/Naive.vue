<template>
  <div>
    <h1>Naive</h1>

    <n-flex size="large">
      <n-button>Default</n-button>
      <n-button type="tertiary">
        Tertiary
      </n-button>
      <n-button type="primary">
        Primary
      </n-button>
      <n-button type="info">
        Info
      </n-button>
      <n-button type="success">
        Success
      </n-button>
      <n-button type="warning">
        Warning
      </n-button>
      <n-button type="error">
        Error
      </n-button>
    </n-flex>

    <hr>

    <n-date-picker v-model:value="date" type="date"/>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const date = ref(Date.now())

</script>

<style scoped>

</style>
