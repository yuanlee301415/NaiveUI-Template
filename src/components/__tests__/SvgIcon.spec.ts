import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import SvgIcon from '@/components/SvgIcon/index.vue'

describe('SvgIcon', () => {
  it('本地图标渲染 use 并指向对应 symbol', () => {
    const wrapper = mount(SvgIcon, { props: { localIcon: 'avatar' } })
    expect(wrapper.find('use').attributes('xlink:href')).toBe('#icon-local-avatar')
  })

  it('UnoCSS 图标渲染为 i 标签', () => {
    const wrapper = mount(SvgIcon, { props: { icon: 'i-mdi:home' } })
    expect(wrapper.find('i').classes()).toContain('i-mdi:home')
  })
})
