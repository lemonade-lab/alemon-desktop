import { ipcMain } from 'electron'
import { resourcesPath } from 'process'
import { templatePath } from './static'
import { join } from 'path'
import { existsSync } from 'fs'
import { yarnAdd, yarnInstall } from './yarn'
import { botClose, botRun } from './bot'
/**
 * 全局可用的
 * 通讯信息
 */

// 得到资源目录
ipcMain.handle('get-app-path', () => {
  return resourcesPath
})

// 询问
ipcMain.handle('get-template-exists', () => {
  const dir = join(templatePath, 'node_modules', 'alemonjs', 'package.json')
  return {
    exists: existsSync(dir)
  }
})

// 加载依赖
ipcMain.handle('yarn-install', () => {
  yarnInstall()
  return
})

ipcMain.handle('yarn-add', () => {
  // yarnAdd()
  return
})

ipcMain.handle('bot-run', () => {
  botRun()
})

ipcMain.handle('bot-close', () => {
  botClose()
})
