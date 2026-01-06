import { Layout } from '@/router/constants.js'
import { Role } from '@/enum'

export const functionRoutes = {
  path: '/function',
  name: 'Function',
  meta: {
    title: '系统功能',
    roles: [...Role],
    icon: 'i-mdi:grid-large'
  },
  component: Layout,
  children: [
    {
      path: 'super-page',
      name: 'SuperPage',
      meta: {
        title: '超级管理员可见',
        roles: [Role.Super]
      },
      component: () => import('@/views/function/super.vue')
    }
  ]
}
