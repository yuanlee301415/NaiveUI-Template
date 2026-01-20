import { Layout } from '@/router/constants.js'

export const naiveRoutes = {
  path: '/naive',
  name: 'Naive',
  meta: {
    title: 'Naive',
    icon: 'i-mdi:alpha-n-box-outline',
  },
  component: Layout,
  children: [
    {
      path: 'button',
      name: 'NaiveIndex',
      meta: { title: 'Button' },
      component: () => import('@/views/naive/button.vue'),
    },
    {
      path: 'i18n',
      name: 'NaiveI18n',
      meta: { title: '国际化' },
      component: () => import('@/views/naive/i18n.vue'),
    },
  ],
}
