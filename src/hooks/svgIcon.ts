/*
 * SvgIcon VNode hook
 * */

import SvgIcon from '@/components/SvgIcon/index.vue'
import { useSvgIconRender } from './svgIconRender'

export function useSvgIcon() {
  const { SvgIconVNode } = useSvgIconRender(SvgIcon)
  return {
    SvgIconVNode,
  }
}
