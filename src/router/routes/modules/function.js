import { Layout } from '@/router/constants.js'
import { Role } from '@/enum'

export const functionRoutes = {
  path: '/function',
  name: 'Function',
  meta: {
    title: '系统功能',
    roles: [...Role],
    icon: 'i-mdi:grid-large',
  },
  component: Layout,
  children: [
    {
      path: 'super-page',
      name: 'SuperPage',
      meta: {
        title: '超级管理员可见',
        roles: [Role.Super],
      },
      component: () => import('@/views/function/super.vue'),
    },
    {
      path: 'toggle-auth',
      name: 'ToggleAuth',
      meta: {
        title: '切换权限',
        roles: [...Role],
      },
      component: () => import('@/views/function/toggle-auth.vue'),
    },
  ],
}
