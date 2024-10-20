import { fork } from 'child_process'
import { join } from 'node:path'
import logger from 'electron-log'
import { templatePath } from './static'

/**
 * yarn 安装依赖
 * @param dir 路径
 * @returns 子进程实例
 */
export const yarnInstall = () => {
  const yarnJS = join(templatePath, 'yarn', 'yarn.cjs')
  const child = fork(yarnJS, ['install'], {
    execArgv: [],
    // 运行目录
    cwd: templatePath,
    stdio: 'pipe' // 确保使用管道来捕获输出
  })
  // 监听子进程的标准输出
  child.stdout?.on('data', data => {
    logger.info(`Yarn install output: ${data.toString()}`)
  })
  // 监听子进程的错误输出
  child.stderr?.on('data', data => {
    logger.error(`Yarn install error: ${data.toString()}`)
  })
  // 监听子进程退出
  child.on('exit', code => {
    logger.info(`Yarn add process exited with code ${code}`)
  })
}

/**
 * yarn 安装 <包名>
 * @param dir 路径
 * @param packageName 包名
 * @returns 子进程实例
 */
export const yarnAdd = (packageName: string) => {
  const yarnJS = join(templatePath, 'yarn', 'yarn.cjs')
  const child = fork(yarnJS, ['add', packageName], {
    execArgv: [],
    // 运行目录
    cwd: templatePath,
    stdio: 'pipe' // 确保使用管道来捕获输出
  })
  // 监听子进程的标准输出
  child.stdout?.on('data', data => {
    logger.info(`Yarn install output: ${data.toString()}`)
  })
  // 监听子进程的错误输出
  child.stderr?.on('data', data => {
    logger.error(`Yarn install error: ${data.toString()}`)
  })
  // 监听子进程退出
  child.on('exit', code => {
    logger.info(`Yarn add process exited with code ${code}`)
  })
}
