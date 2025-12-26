/*
 * 生成 Release 文件
 */
import { resolve } from 'node:path'
import { env } from 'node:process'
import { readFileSync, writeFileSync } from 'node:fs'

function generateRelease() {
  const envPath = resolve('.env')
  const envText = readFileSync(envPath, 'utf-8')
  if (!envText) return console.error('[generateRelease]:: 读取.env文件失败')

  const reg = /(VITE_INTERNAL_VERSION\s?=\s?)(\d+)/m
  const match = envText.match(reg)
  if (!match || !match[2]) return console.error('[generateRelease]:: 匹配 VITE_INTERNAL_VERSION 失败')

  const time = new Date()
  const buildTime = `${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
  const text = [`VERSION: ${[env.npm_package_version, match[2]].join('.')}`, `BUILD_TIME: ${buildTime}`].join('\n')
  writeFileSync(resolve('dist/release'), text, 'utf-8')

  console.log(`
    \n--------------------[GenerateRelease]:: Success--------------------
    \n${text}
    \n-------------------------------------------------------------------
    `)
}

generateRelease()
