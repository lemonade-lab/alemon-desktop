import { ChildProcess, fork } from 'child_process'
import { join } from 'node:path'
import logger from 'electron-log'
import { templatePath } from './static'

let child: ChildProcess | null = null // 存储子进程实例

/**
 * yarn 安装依赖
 * @param dir 路径
 */
export const botRun = () => {
  if (child) {
    logger.warn('Bot is already running.') // 如果进程已存在，记录警告
    return // 直接返回，避免重复执行
  }

  const MYJS = join(templatePath, 'node_modules', 'lvyjs', 'bin', 'index.js')
  child = fork(MYJS, ['dev', '--alemonjs', '--login', 'gui'], {
    execArgv: [],
    cwd: templatePath,
    stdio: 'pipe'
  })

  // 监听子进程的标准输出
  child.stdout?.on('data', data => {
    logger.info(`Child process output: ${data.toString()}`)
  })

  // 监听子进程的错误输出
  child.stderr?.on('data', data => {
    logger.error(`Child process error: ${data.toString()}`)
  })

  // 监听子进程退出
  child.on('exit', code => {
    logger.info(`Child process exited with code ${code}`)
    child = null // 清空子进程实例
  })
}

/**
 * 关闭子进程
 */
export const botClose = () => {
  if (!child) {
    logger.warn('No bot is running.') // 如果没有进程在运行，记录警告
    return // 直接返回
  }
  child.kill() // 关闭子进程
  child = null // 清空子进程实例
  logger.info('Bot process has been closed.')
}
