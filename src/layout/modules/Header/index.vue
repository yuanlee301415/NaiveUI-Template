<script setup>
import { useRouter } from 'vue-router'
import { useAuthUserStore } from '@/stores/modules/authUser/index.js'
import { LOGIN_ROUTE_NAME } from '@/router/constants.js'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { useSvgIcon } from '@/hooks/useSvgIcon.js'

const authUserStore = useAuthUserStore()
const router = useRouter()
const { SvgIconVNode } = useSvgIcon()

const options = [
  { label: '退出登录', key: 'logout', icon: SvgIconVNode({ icon: 'i-uil:exit', size: 18 }) }
]
</script>

<template>
  <header class="flex justify-between">
    <n-h2>Header</n-h2>
    <n-flex size="medium">
      <template v-if="authUserStore.user.name">
        <n-dropdown :options="options" trigger="click">
          <n-button>
            <template #icon>
              <SvgIcon icon="i-uil:user-circle" />
            </template>
            {{ authUserStore.user.name }}
          </n-button>
        </n-dropdown>
      </template>
      <n-button v-else text @click="router.push({name: LOGIN_ROUTE_NAME})">[登录]</n-button>
    </n-flex>
  </header>
</template>

<style scoped lang="less">

</style>
