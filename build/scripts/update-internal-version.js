/*
 * 更新内部版本号
 */
import { resolve } from 'node:path'
import { readFileSync, writeFileSync } from 'node:fs'

/**
 * 更新内部版本号
 */
class UpdateInternalVersion {
  // 内部版本号正则
  VERSION_REG = /(VITE_INTERNAL_VERSION\s?=\s?)(\d+)/m

  // .env 文件路径
  ENV_PATH = resolve('.env')

  // .env 文件内容
  envText

  // 新版本号
  newVersion

  constructor() {
    try {
      this.getVersion()
      this.updateVersion()
    } catch (e) {
      console.error('[UpdateInternalVersion]:: Error:')
      console.error(e)
    }
  }

  /**
   * 获取内部版本号
   * @return {void}
   */
  getVersion() {
    const envText = readFileSync(this.ENV_PATH, 'utf-8')
    if (!envText) throw '读取 .env 文件失败'

    const match = envText.match(this.VERSION_REG)
    if (!match || !match[2]) throw '获取版本号失败'

    this.envText = envText
    this.newVersion = Number(match[2]) + 1
  }

  /**
   * 更新内部版本号
   * @return {void}
   */
  updateVersion() {
    writeFileSync(this.ENV_PATH, this.envText.replace(this.VERSION_REG, `$1${this.newVersion}`), 'utf-8')

    console.log(`
    \n--------------------[UpdateInternalVersion]:: Success----------------------
    \nNew version: ${this.newVersion}
    \n---------------------------------------------------------------------------
    `)
  }
}

new UpdateInternalVersion()
