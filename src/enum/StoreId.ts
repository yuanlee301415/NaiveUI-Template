/*
 * Store id
 * */

export const StoreId = {
  Auth: 'authStore',
  Route: 'routeStore',
  App: 'appStore',
} as const

export type StoreIdType = (typeof StoreId)[keyof typeof StoreId]
