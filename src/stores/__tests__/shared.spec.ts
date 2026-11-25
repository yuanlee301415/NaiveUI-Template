import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { describe, expect, it } from 'vitest'

import { filterAsyncRoutes, genMenus, hasPermission } from '@/stores/shared'
import type { RoleType } from '@/enum'

/** 子路由需要 component / redirect 之一，这里用空组件占位 */
const StubComponent: Component = { render: () => null }

const routes: RouteRecordRaw[] = [
  {
    path: '/a',
    name: 'A',
    meta: { title: 'A' },
    children: [
      { path: 'a1', name: 'A1', meta: { title: 'A1' }, component: StubComponent },
      { path: 'a2', name: 'A2', meta: { title: 'A2', roles: ['SUPER'] }, component: StubComponent },
    ],
  },
  {
    path: '/b',
    name: 'B',
    meta: { title: 'B', roles: ['ADMIN'] },
    children: [],
  },
]

describe('hasPermission', () => {
  it('路由未配置 roles 时视为有权限', () => {
    expect(hasPermission(['USER'], routes[0] as RouteRecordRaw)).toBe(true)
  })

  it('角色命中时有权限', () => {
    expect(hasPermission(['ADMIN'], routes[1] as RouteRecordRaw)).toBe(true)
  })

  it('角色未命中时无权限', () => {
    expect(hasPermission(['USER'], routes[1] as RouteRecordRaw)).toBe(false)
  })
})

describe('filterAsyncRoutes', () => {
  it('按角色过滤并保留嵌套结构', () => {
    const filtered = filterAsyncRoutes(['SUPER', 'ADMIN'], routes)
    expect(filtered).toHaveLength(2)
    expect((filtered[0]?.children ?? []).map((route) => route.name)).toEqual(['A1', 'A2'])
  })

  it('移除无权限路由及其子路由', () => {
    const filtered = filterAsyncRoutes(['USER'] as RoleType[], routes)
    expect(filtered.map((route) => route.name)).toEqual(['A'])
    expect((filtered[0]?.children ?? []).map((route) => route.name)).toEqual(['A1'])
  })
})

describe('genMenus', () => {
  it('生成菜单的 path / title / depth', () => {
    const menus = genMenus([
      {
        path: '/a',
        name: 'A',
        meta: { title: 'A', icon: 'i-mdi:home-outline' },
        children: [{ path: 'a1', name: 'A1', meta: { title: 'A1' }, component: StubComponent }],
      },
    ])

    expect(menus).toHaveLength(1)
    expect(menus[0]).toMatchObject({ path: '/a', title: 'A', icon: 'i-mdi:home-outline', depth: 1 })
    expect(menus[0]?.children?.[0]).toMatchObject({ path: '/a/a1', title: 'A1', depth: 2 })
  })

  it('跳过无 title 与无子路由的路由', () => {
    const menus = genMenus([
      { path: '/no-title', name: 'NoTitle', children: [{ path: 'x', name: 'X', meta: { title: 'X' }, component: StubComponent }] },
      { path: '/no-children', name: 'NoChildren', meta: { title: 'NoChildren' }, children: [] },
    ])

    expect(menus).toHaveLength(0)
  })
})
