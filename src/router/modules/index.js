import Layout from '@/layout/index.vue'
import HomeView from '@/views/HomeView.vue'
import {nested} from '@/router/modules/nested.js'

const basic = [
  {
    path: '/',
    name: 'Home',
    meta: {title: '首页'},
    component: Layout,
    children: [
      {
        path: '',
        component: HomeView
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    meta: {title: '关于'},
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/AboutView.vue'),
      }
    ]
  },
  {
    path: '/naive',
    name: 'Naive',
    meta: {title: 'Naive'},
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/Naive.vue'),
      }
    ]
  },
]

export const routes = [...basic, nested]
