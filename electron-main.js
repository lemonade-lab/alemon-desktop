// 这个文件可以直接用 electron 命令运行。

const fs = require('fs')
const path = require('path')
// const rimraf = require('rimraf');
const { BrowserWindow, app, ipcMain } = require('electron')
// const { compile } = require('./bytecode');

async function main() {
  // 输入目录，用于存放待编译的 js bundle
  // const inputPath = path.resolve(__dirname, 'dist-electron/main');
  // 输出目录，用于存放编译产物，也就是字节码，文件名对应关系：main.js -> main.bin
  const outputPath = path.resolve(__dirname, 'dist-electron/main')
  // 清理并重新创建输出目录
  // rimraf.sync(outputPath);
  // fs.mkdirSync(outputPath);

  // 读取原始 js 并生成字节码
  // const code = fs.readFileSync(path.resolve(inputPath, 'index.js'));
  // fs.writeFileSync(path.resolve(outputPath, 'index.jsc'), compile(code));
  // 将原先的 js 文件替换为固定格式：require('bytenode');require('./index.jsc');
  require('bytenode').compileFile({
    filename: 'dist-electron/main/index.js' //它会在源文件同一目录下生成同名jsc后缀的字节码文件
  })
  const str = `require('bytenode');require('./index.jsc');`
  fs.writeFileSync(path.resolve(outputPath, `index.js`), str)
  // 启动一个浏览器窗口用于渲染进程字节码的编译
  await launchRenderer()
}

async function launchRenderer() {
  await app.whenReady()

  const win = new BrowserWindow({
    show: false,
    webPreferences: {
      // 我们通过 preload 在 renderer 执行 js，这样就不需要一个 html 文件了。
      preload: path.resolve(__dirname, './electron-renderer.js'),
      enableRemoteModule: true,
      nodeIntegration: true
    }
  })
  win.loadURL('about:blank')
}

main()

ipcMain.on('close', async (event, key) => {
  app.quit()
})
