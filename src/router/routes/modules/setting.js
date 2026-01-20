import { Layout } from '@/router/constants.js'
import { Role } from '@/enum'

export const settingRoutes = {
  path: '/setting',
  name: 'Setting',
  meta: {
    title: '设置',
    roles: [Role.User, Role.Admin],
    icon: 'i-mdi:cog-outline',
  },
  component: Layout,
  redirect: '/setting/account',
  children: [
    {
      path: 'account',
      name: 'SettingAccount',
      meta: {
        title: '个人设置',
        roles: [Role.User, Role.Admin],
      },
      component: () => import('@/views/setting/account.vue'),
    },
    {
      path: 'system',
      name: 'SettingSystem',
      meta: {
        title: '系统设置',
        roles: [Role.Admin],
      },
      component: () => import('@/views/setting/system.vue'),
    },
  ],
}
