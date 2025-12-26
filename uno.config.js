import { defineConfig, presetWind3 } from 'unocss'
import presetIcons from '@unocss/preset-icons'

export default defineConfig({
  // ...UnoCSS options
  presets: [
    presetWind3(),

    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle'
      }
    })
  ],

  // 安全列表，确保动态图标被扫描
  safelist: [
    'i-mdi:home-outline',
    'i-mdi:information-slab-circle-outline',
    'i-mdi:alpha-n-box-outline',
    'i-mdi:timer-sand-complete',
  ],

  /*
* 快捷方式
* @see https://unocss.net/config/shortcuts#快捷方式
* */
  shortcuts: [
    {
      'flex-center': 'flex justify-center items-center',
      'flex-x-center': 'flex justify-center',
      'flex-y-center': 'flex items-center',
      'size-full': 'w-full h-full'
    }
  ]
})
