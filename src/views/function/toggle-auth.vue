<script setup>
import { useAuthStore } from '@/stores/modules/auth/index.js'
import { useRouteStore } from '@/stores/modules/route/index.js'
import { Role } from '@/enum'
import { removeAuthToken } from '@/utils/authToken.js'
import { usePermission } from '@/hooks/permission.js'

defineOptions({ name: 'ToggleAuth' })

const authStore = useAuthStore()
const routeStore = useRouteStore()
const { hasPermission } = usePermission()

const ACCOUNTS = [
  { login: 'super', name: '超级管理员' },
  { login: 'admin', name: '管理员' },
  { login: 'user', name: '普通用户' },
]

/**
 * 切换帐号
 * @param {User.login} login
 */
async function handleToggleAccount({ login }) {
  authStore.resetStore()
  removeAuthToken()
  await authStore.login({ login })
  routeStore.redirectFormLogin()
}
</script>

<template>
  <n-flex vertical size="large">
    <h1>切换权限</h1>

    <n-card title="用户角色" segmented>
      <n-tag>{{ authStore.user.roles }}</n-tag>
    </n-card>

    <n-card title="切换帐号" segmented>
      <n-flex :size="15" class="w-full flex-y-center justify-between">
        <n-button v-for="ac of ACCOUNTS" :key="ac.login" @click="handleToggleAccount(ac)">{{ ac.name }} </n-button>
      </n-flex>
    </n-card>

    <n-card title="权限指令" segmented>
      <n-flex size="large">
        <n-button v-permission="[...Role]">所有角色</n-button>
        <n-button v-permission="[Role.Super, Role.Admin]">超级管理员、管理员</n-button>
        <n-button v-permission="[Role.Super]">超级管理员</n-button>
        <n-button v-permission="[Role.Admin]">管理员</n-button>
        <n-button v-permission="[Role.User]">用户</n-button>
      </n-flex>
    </n-card>

    <n-card title="权限 Hook" segmented>
      <n-flex size="large">
        <n-button v-if="hasPermission([...Role])">所有角色</n-button>
        <n-button v-if="hasPermission([Role.Super, Role.Admin])">超级管理员、管理员</n-button>
        <n-button v-if="hasPermission([Role.Super])">超级管理员</n-button>
        <n-button v-if="hasPermission([Role.Admin])">管理员</n-button>
        <n-button v-if="hasPermission([Role.User])">用户</n-button>
      </n-flex>
    </n-card>
  </n-flex>
</template>

<style scoped lang="less"></style>
