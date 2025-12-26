/*
 * 更新内部版本号
 */
import { resolve } from 'node:path'
import { readFileSync, writeFileSync } from 'node:fs'

function updateVersion() {
  const envPath = resolve('.env')
  const envText = readFileSync(envPath, 'utf-8')
  if (!envText) return console.error('[updateVersion]:: 读取.env文件失败')

  const reg = /(VITE_INTERNAL_VERSION\s?=\s?)(\d+)/m
  const match = envText.match(reg)
  if (!match || !match[2]) return console.error('[updateVersion]:: 匹配 VITE_INTERNAL_VERSION 失败')

  const newVer = Number(match[2]) + 1
  writeFileSync(envPath, envText.replace(reg, `$1${newVer}`), 'utf-8')

  console.log(`
    \n--------------------[UpdateVersion]:: Success--------------------
    \nNew Version: ${newVer}
    \n-------------------------------------------------------------------
    `)
}

updateVersion()
