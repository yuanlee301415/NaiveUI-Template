import { createHtmlPlugin } from 'vite-plugin-html'

export interface HtmlPluginOptions {
  mode: string
  version: string
  buildTime: string
}

export function html({ mode, version, buildTime }: HtmlPluginOptions) {
  return createHtmlPlugin({
    entry: 'src/main.ts',
    minify: true,
    inject: {
      data: {
        mode,
        version,
        time: buildTime,
      },
    },
  })
}
