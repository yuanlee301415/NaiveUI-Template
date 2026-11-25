import { describe, expect, it } from 'vitest'

import { html } from '../plugins/html'

interface InjectedTag {
  tag: string
  attrs: Record<string, string>
  injectTo: string
}

describe('html plugin', () => {
  it('注入 release meta（版本@构建时间@模式）', () => {
    const plugin = html({ mode: 'production', version: '1.2.3.1005', buildTime: '2026-01-01T00:00:00.000Z' })
    expect(plugin.name).toBe('local-html-release')

    const transform = plugin.transformIndexHtml as unknown as () => InjectedTag[]
    expect(transform()).toEqual([
      {
        tag: 'meta',
        attrs: { name: 'release', content: '1.2.3.1005@2026-01-01T00:00:00.000Z@production' },
        injectTo: 'head',
      },
    ])
  })
})
