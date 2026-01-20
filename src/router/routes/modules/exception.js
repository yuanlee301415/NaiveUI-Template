import { Layout, NOT_FOUND_PAGE } from '@/router/constants.js'

export const exceptionRoutes = {
  path: '/exception',
  name: 'Exception',
  meta: {
    title: '异常页面',
    icon: 'i-mdi:block-helper',
  },
  component: Layout,
  children: [
    {
      path: '404',
      name: 'Exception404',
      meta: {
        title: '404',
      },
      component: NOT_FOUND_PAGE,
    },
    {
      path: '403',
      name: 'Exception403',
      meta: {
        title: '403',
      },
      component: () => import('@/views/exception/403.vue'),
    },
  ],
}
