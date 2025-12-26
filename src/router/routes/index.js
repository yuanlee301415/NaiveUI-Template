import { Layout, HOME_ROUTE_NAME } from '@/router/constants.js'
import HomeView from '@/views/home/index.vue'
import { nestedRoutes } from '@/router/routes/modules/nested.js'
import { exceptionRoutes } from '@/router/routes/modules/exception.js'
import { loginRoutes } from '@/router/routes/modules/login.js'

/*
 * 基础（静态）路由
 * */
export const basic = [
  {
    path: '/',
    meta: { title: '首页', icon: 'i-mdi:home-outline' },
    component: Layout,
    children: [
      {
        path: '',
        name: HOME_ROUTE_NAME,
        component: HomeView,
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    meta: { title: '关于', icon: 'i-mdi:information-slab-circle-outline' },
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/about/index.vue'),
      },
    ],
  },
  {
    path: '/naive',
    name: 'Naive',
    meta: {
      title: 'Naive',
      icon: 'i-mdi:alpha-n-box-outline',
    },
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/naive/index.vue'),
      },
    ],
  },

  {
    path: '/user',
    name: 'User',
    meta: { title: '用户中心', roles: ['User'], icon: 'i-mdi:account-outline' },
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/user/index.vue'),
      },
    ],
  },

  nestedRoutes,

  exceptionRoutes,

  loginRoutes,
]

const notFound = {
  path: '/:path(.*)*',
  name: 'NotFound',
  redirect: '/exception/404',
}

export const routes = [...basic, notFound]
