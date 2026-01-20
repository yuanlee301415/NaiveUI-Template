import { Layout } from '@/router/constants.js'
import { Role } from '@/enum'

export const manageRoutes = {
  path: '/manage',
  name: 'Manage',
  meta: {
    title: '系统管理',
    roles: [...Role],
    icon: 'i-mdi:grid-large',
  },
  component: Layout,
  children: [
    {
      path: 'user',
      name: 'ManageUser',
      meta: {
        title: '用户管理',
        roles: [...Role],
      },
      component: () => import('@/views/manage/user/index.vue'),
    },
  ],
}
