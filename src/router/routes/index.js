import { Layout, HOME_ROUTE_NAME, LOGIN_ROUTE_NAME } from '@/router/constants.js'
import HomeView from '@/views/HomeView.vue'
import { nested } from '@/router/routes/modules/nested.js'
import { exception } from '@/router/routes/modules/exception.js'

/*
* 基础（静态）路由
* */
export const basic = [
  {
    path: '/',
    meta: { title: '首页' },
    component: Layout,
    children: [
      {
        path: '',
        name: HOME_ROUTE_NAME,
        component: HomeView
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    meta: { title: '关于' },
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/AboutView.vue')
      }
    ]
  },
  {
    path: '/naive',
    name: 'Naive',
    meta: { title: 'Naive' },
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/Naive.vue')
      }
    ]
  },
  {
    path: '/login',
    children: [
      {
        path: '',
        name: LOGIN_ROUTE_NAME,
        component: () => import('@/views/login/index.vue')
      }
    ]
  },
  {
    path: '/user',
    name: 'User',
    meta: { title: '用户中心', roles: ['User'] },
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/User.vue')
      }
    ]
  },

  nested,

  exception,
]

const notFound =   {
  path: '/:path(.*)*',
  name: 'NotFound',
  redirect: '/exception/404'
}

export const routes = [
  ...basic,
  notFound
]
