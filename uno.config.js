import { defineConfig } from 'unocss'
import presetWind4 from '@unocss/preset-wind4'

export default defineConfig({
  // ...UnoCSS options
  presets: [
    presetWind4()
  ],

  /*
* 快捷方式
* @see https://unocss.net/config/shortcuts#快捷方式
* */
  shortcuts: [
    {
      'flex-center': 'flex justify-center items-center'
    }
  ]
})
