import { fork } from 'child_process'
import { join } from 'node:path'
/**
 * yarn 安装依赖
 * @param dir 路径
 * @returns 子进程实例
 */
export const installDependencies = (dir: string) => {
  // 新建子进程，执行 yarn install
  const child = fork(join(__dirname, '../../yarn/yarn.js'), ['install'], {
    execArgv: [],
    // 运行目录
    cwd: dir
  })
  // 返回子进程实例
  return child
}

/**
 * yarn 安装 <包名>
 * @param dir 路径
 * @param packageName 包名
 * @returns 子进程实例
 */
export const installPackage = (packageName: string, dir: string) => {
  // 新建子进程，执行 yarn add <包名>
  const child = fork(join(__dirname, '../../yarn/yarn.js'), ['add', packageName], {
    execArgv: [],
    // 运行目录
    cwd: dir
  })
  // 返回子进程实例
  return child
}

/**
 * yarn 安装 alemonjs
 * @returns 子进程实例
 */
export const updateAlemon = () => {
  // 新建子进程，执行 yarn add alemonjs@latest
  const child = fork(join(__dirname, '../../yarn/yarn.js'), ['add', 'alemonjs@latest'], {
    execArgv: [],
    // 运行目录
    cwd: join(__dirname, '../../../')
  })
  // 返回子进程实例
  return child
}
