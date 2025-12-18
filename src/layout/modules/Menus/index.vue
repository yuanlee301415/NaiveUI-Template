<script setup>
import { ref } from 'vue'
import {useRouteStore} from '@/stores/modules/route/index.js'
import MenuItem from './MenuItem.vue'

const routeStore = useRouteStore()
const menus = ref(null)

menus.value = routeStore.menus
// console.log('menus:', menus)
</script>

<template>
  <nav>
    <MenuItem v-for="menu of menus" :key="menu.name" :menu="menu"/>
  </nav>
</template>
