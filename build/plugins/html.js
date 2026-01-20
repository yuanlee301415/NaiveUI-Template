import { createHtmlPlugin } from 'vite-plugin-html'

export function html({ mode, version, buildTime }) {
  return createHtmlPlugin({
    entry: 'src/main.js',
    minify: true,
    inject: {
      data: {
        mode,
        version,
        time: buildTime
      }
    }
  })
}
