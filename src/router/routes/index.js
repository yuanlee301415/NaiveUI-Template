import HomeView from '@/views/home/index.vue'
import { Layout, HOME_ROUTE_NAME, NOT_FOUND_ROUTE_NAME, NOT_FOUND_PAGE } from '@/router/constants.js'
import { basicRoutes } from '@/router/routes/basic.js'
import { nestedRoutes } from '@/router/routes/modules/nested.js'
import { settingRoutes } from '@/router/routes/modules/setting.js'

/*
 * 静态路由
 * - 所有角色公共路由
 * */
export const staticRoutes = [
  {
    path: '/',
    name: 'HomeRoot',
    meta: { title: '首页', icon: 'i-mdi:home-outline' },
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
    path: '/naive',
    name: 'NaiveRoot',
    meta: {
      title: 'Naive',
      icon: 'i-mdi:alpha-n-box-outline'
    },
    component: Layout,
    children: [
      {
        path: '',
        name: 'Naive',
        component: () => import('@/views/naive/index.vue')
      }
    ]
  },

  {
    path: '/about',
    name: 'AboutRoot',
    meta: { title: '关于', icon: 'i-mdi:information-slab-circle-outline' },
    component: Layout,
    children: [
      {
        path: '',
        name: 'About',
        component: () => import('@/views/about/index.vue')
      }
    ]
  },

  nestedRoutes,

  ...basicRoutes
]

/*
 * 动态路由
 * - 有权限限制，根据用户角色动态添加
 * */
export const dynamicRoutes = [
  {
    path: '/user',
    name: 'UserRoot',
    meta: { title: '用户中心', roles: ['User'], icon: 'i-mdi:account-outline' },
    component: Layout,
    children: [
      {
        path: '',
        name: 'User',
        component: () => import('@/views/user/index.vue')
      }
    ]
  },

  settingRoutes,

  // VueRouter 库限制，必须放置在所有路由后面
  {
    path: '/:pathMatch(.*)*',
    name: NOT_FOUND_ROUTE_NAME,
    component: NOT_FOUND_PAGE
  }
]
