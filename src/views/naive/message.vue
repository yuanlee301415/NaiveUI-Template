<script setup>
defineOptions({ name: 'NaiveMessage' })

function message1() {
  window.$message.success('messageProviderProps 默认参数')
}

function message2() {
  window.$message.success('success() 方法参数覆盖默认参数', { duration: 1000, closable: false })
}
</script>

<template>
  <n-flex vertical>
    <n-card title="Message">
      <n-flex size="large">
        <n-button @click="message1">Message 1: messageProviderProps 默认参数</n-button>
        <n-button @click="message2">Message 2: success() 方法参数覆盖默认参数</n-button>
      </n-flex>
    </n-card>
  </n-flex>
</template>
