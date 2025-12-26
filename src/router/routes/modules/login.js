import { LOGIN_ROUTE_NAME, LOGIN_PASSWORD_ROUTE_NAME, LOGIN_CODE_ROUTE_NAME, LOGIN_REGISTER_ROUTE_NAME } from '@/router/constants.js'

export const loginRoutes = {
  path: '/login',
  component: () => import('@/views/login/index.vue'),
  name: LOGIN_ROUTE_NAME,
  redirect: '/login/password',
  children: [
    {
      path: 'password',
      name: LOGIN_PASSWORD_ROUTE_NAME,
      component: () => import('@/views/login/modules/password.vue'),
    },
    {
      path: 'code',
      name: LOGIN_CODE_ROUTE_NAME,
      component: () => import('@/views/login/modules/code.vue'),
    },
    {
      path: 'register',
      name: LOGIN_REGISTER_ROUTE_NAME,
      component: () => import('@/views/login/modules/register.vue'),
    }
  ]
}
