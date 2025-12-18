import { Layout } from '@/router/constants.js'

export const exception = {
  path: '/exception',
  name: 'Exception',
  component: Layout,
  children: [
    {
      path: '404',
      component: () => import('@/views/exception/404.vue')
    },
    {
      path: '403',
      component: () => import('@/views/exception/403.vue')
    }
  ]
}
