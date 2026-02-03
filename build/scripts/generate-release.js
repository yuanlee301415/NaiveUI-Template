/*
 * 生成 Release 文件
 */
import { resolve } from 'node:path'
import { readFileSync, writeFileSync } from 'node:fs'

/**
 * 生成 Release 文件
 */
class GenerateRelease {
  /**
   * 版本号
   * @type {string}
   */
  fullVersion

  /**
   * 构建时间
   * @type {string}
   */
  buildTime

  /**
   * 构建模式
   * @type {string}
   */
  mode

  constructor() {
    try {
      this.getReleaseContent()
      this.generateRelease()
    } catch (e) {
      console.error('[GenerateRelease]:: Error:')
      console.error(e)
    }
  }

  /**
   * 获取内部版本号
   * @return {void}
   */
  getReleaseContent() {
    const htmlText = readFileSync(resolve('dist/index.html'), 'utf-8')
    if (!htmlText) throw '读取 HTML 文件失败'

    const reg = /<meta name="release" content="(.*?)@(.*?)@(.*?)">/m
    const match = htmlText.match(reg)
    if (!match || !match[1] || !match[2] || !match[3]) throw '获取 release content 失败'

    this.fullVersion = match[1]
    this.buildTime = match[2]
    this.mode = match[3]
  }

  /**
   * 生成 release 文件
   * @return {void}
   */
  generateRelease() {
    const text = ['VERSION: ' + this.fullVersion, 'BUILD_TIME: ' + this.buildTime, 'MODE: ' + this.mode].join('\n')

    writeFileSync(resolve('dist/release'), text, 'utf-8')

    console.log(`
    \n--------------------[GenerateRelease]:: Success--------------------
    \n${text}
    \n-------------------------------------------------------------------
    `)
  }
}

new GenerateRelease()
