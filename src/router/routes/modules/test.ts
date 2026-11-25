import type { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/router/constants'

export const testRoutes: RouteRecordRaw = {
  path: '/test',
  name: 'Test',
  meta: {
    title: 'Test',
    icon: 'i-mdi:ab-testing',
  },
  component: Layout,
  children: [
    {
      path: 'countdown',
      name: 'TestCountdown',
      meta: {
        title: '倒计时',
      },
      component: () => import('@/views/test/countdown.vue'),
    },
  ],
}
