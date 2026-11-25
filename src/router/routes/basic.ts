import { loginRoutes } from '@/router/routes/modules/login'
import { exceptionRoutes } from '@/router/routes/modules/exception'

/*
 * 应用基础路由
 * - 无权限限制
 * */
export const basicRoutes = [loginRoutes, exceptionRoutes]
