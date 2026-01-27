/*
 * SvgIcon VNode hook
 * */

import { useSvgIconRender } from './svgIconRender.js'
import SvgIcon from '@/components/SvgIcon/index.vue'

export function useSvgIcon() {
  const { SvgIconVNode } = useSvgIconRender(SvgIcon)
  return {
    SvgIconVNode,
  }
}
