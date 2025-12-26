<script setup>
defineOptions({ name: 'HomeIndex' })
</script>

<template>
  <div class="home-page">
    <h1>Home page.</h1>
    <div class="p-6 max-w-sm mx-auto rounded-xl shadow-md flex-center space-x-4">
      <div class="flex-shrink-0">
        <img class="h-12 w-12" src="../../assets/logo.svg" alt="Logo" />
      </div>
      <div>
        <div class="text-xl font-medium text-gray-400">ChitChat</div>
        <p class="text-gray-500">You have a new message!</p>
      </div>
    </div>
  </div>
</template>
