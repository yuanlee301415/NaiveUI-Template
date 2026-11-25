import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { createRegisterCode, createSymbolId, loadSymbols, renderSprite, renderSymbol, SVG_ICONS_REGISTER_ID } from '../plugins/svgIcons'

const SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="currentColor"/></svg>'

describe('createSymbolId', () => {
  it('根目录图标：prefix-name', () => {
    expect(createSymbolId('icon-local', 'avatar.svg')).toBe('icon-local-avatar')
  })

  it('子目录图标：prefix-dir-name', () => {
    expect(createSymbolId('icon-local', 'brand/logo.svg')).toBe('icon-local-brand-logo')
  })

  it('兼容 Windows 路径分隔符', () => {
    expect(createSymbolId('icon-local', 'brand\\logo.svg')).toBe('icon-local-brand-logo')
  })
})

describe('renderSymbol', () => {
  it('提取 viewBox 并保留内容', () => {
    const symbol = renderSymbol(SVG, 'icon-local-test')
    expect(symbol).toContain('<symbol id="icon-local-test" viewBox="0 0 24 24">')
    expect(symbol).toContain('<path')
  })

  it('非法 svg 返回 null', () => {
    expect(renderSymbol('not a svg', 'icon-local-test')).toBeNull()
  })
})

describe('renderSprite', () => {
  it('按顺序拼接 symbol', () => {
    expect(renderSprite(['<symbol id="a"/>', '<symbol id="b"/>'])).toBe('<symbol id="a"/><symbol id="b"/>')
  })
})

describe('loadSymbols', () => {
  let iconDir: string

  beforeEach(() => {
    iconDir = mkdtempSync(join(tmpdir(), 'svg-icons-'))
    writeFileSync(join(iconDir, 'avatar.svg'), SVG)
    mkdirSync(join(iconDir, 'brand'))
    writeFileSync(join(iconDir, 'brand', 'logo.svg'), SVG)
  })

  afterEach(() => {
    rmSync(iconDir, { recursive: true, force: true })
  })

  it('递归扫描目录并生成 symbol', () => {
    const symbols = loadSymbols(iconDir, 'icon-local')
    expect(symbols).toHaveLength(2)
    expect(symbols.join('')).toContain('icon-local-avatar')
    expect(symbols.join('')).toContain('icon-local-brand-logo')
  })

  it('忽略非 svg 文件', () => {
    writeFileSync(join(iconDir, 'readme.txt'), 'not an icon')
    expect(loadSymbols(iconDir, 'icon-local')).toHaveLength(2)
  })
})

describe('createRegisterCode', () => {
  it('生成注入 body 末尾的注册代码', () => {
    const code = createRegisterCode('<symbol id="avatar"/>', '__SVG_ICON_LOCAL__')
    expect(code).toContain('svgDom.innerHTML')
    expect(code).toContain('body.insertBefore')
    expect(code).toContain('DOMContentLoaded')
    expect(code).toContain('export default')
  })
})

describe('SVG_ICONS_REGISTER_ID', () => {
  it('保持虚拟模块 id 与 main.ts 约定一致', () => {
    expect(SVG_ICONS_REGISTER_ID).toBe('virtual:svg-icons-register')
  })
})
