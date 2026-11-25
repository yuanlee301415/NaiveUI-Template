/*
 * SvgIcon render hook
 * */

import type { Component, VNode } from 'vue'
import { h } from 'vue'

export interface SvgIconVNodeConfig {
  /** UnoCSS 图标 class */
  icon?: string
  /** 本地 SVG 图标名 */
  localIcon?: string
  /** 颜色 */
  color?: string
  /** 大小（px） */
  size?: number
}

export type SvgIconVNodeFactory = (config?: SvgIconVNodeConfig) => () => VNode

export function useSvgIconRender(SvgIcon: Component) {
  const SvgIconVNode: SvgIconVNodeFactory = (config = {}) => {
    const { icon, localIcon, color, size } = config
    const style = {
      color,
      fontSize: size ? `${size}px` : void 0,
    }
    return () => h(SvgIcon, { icon, localIcon, style })
  }

  return {
    SvgIconVNode,
  }
}
