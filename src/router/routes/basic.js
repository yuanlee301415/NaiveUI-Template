import { loginRoutes } from '@/router/routes/modules/login.js'
import { exceptionRoutes } from '@/router/routes/modules/exception.js'

/*
* 应用基础路由
* - 无权限限制
* */
export const basicRoutes = [
  loginRoutes,

  exceptionRoutes
]
