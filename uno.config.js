import { defineConfig } from 'unocss'
import presetWind4 from '@unocss/preset-wind4'
import presetIcons from '@unocss/preset-icons'

export default defineConfig({
  // ...UnoCSS options
  presets: [
    presetWind4(),

    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle'
      }
    })
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
