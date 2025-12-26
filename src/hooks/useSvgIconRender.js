/*
 * SvgIcon render hook
 * */

import { h } from 'vue'

export function useSvgIconRender(SvgIcon) {
  function SvgIconVNode(config = {}) {
    console.log(config)
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
