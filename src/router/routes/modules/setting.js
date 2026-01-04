import { Layout } from '@/router/constants.js'

export const settingRoutes = {
  path: '/setting',
  name: 'Setting',
  meta: {
    title: '设置',
    roles: ['User', 'Admin'],
    icon: 'i-mdi:cog-outline'
  },
  component: Layout,
  redirect: '/setting/account',
  children: [
    {
      path: 'account',
      name: 'SettingAccount',
      meta: {
        title: '个人设置',
        roles: ['User', 'Admin']
      },
      component: () => import('@/views/setting/account.vue'),
    },
    {
      path: 'system',
      name: 'SettingSystem',
      meta: {
        title: '系统设置',
        roles: ['Admin']
      },
      component: () => import('@/views/setting/system.vue'),
    },
  ],
}
