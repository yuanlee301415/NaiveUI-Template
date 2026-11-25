import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { Plugin } from 'vite'

export interface ReleasePluginOptions {
  version: string
  buildTime: string
  mode: string
}

/**
 * 生成 release 文件
 */
export function releasePlugin({ version, buildTime, mode }: ReleasePluginOptions): Plugin {
  return {
    name: 'release-plugin',
    writeBundle() {
      const text = ['VERSION: ' + version, 'BUILD_TIME: ' + buildTime, 'MODE: ' + mode].join('\n')
      writeFileSync(resolve('dist/release'), text, 'utf-8')
      console.log(`
      \n--------------------[GenerateRelease]:: Success--------------------
      \n${text}
      \n-------------------------------------------------------------------
      `)
    },
  }
}
