import { Layout, ROOT_ROUTE_NAME, LOGIN_ROUTE_NAME } from '@/router/constants.js'
import HomeView from '@/views/HomeView.vue'
import { nested } from '@/router/routes/modules/nested.js'
import { exception } from '@/router/routes/modules/exception.js'

/*
* 基础（静态）路由
* */
export const basic = [
  {
    path: '/',
    name: ROOT_ROUTE_NAME,
    meta: { title: '首页' },
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
    component: Layout,
    children: [
      {
        path: '',
        name: LOGIN_ROUTE_NAME,
        component: () => import('@/views/Login.vue')
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
