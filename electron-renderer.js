// 这个文件是在 electorn-main.js 创建的浏览器窗口中运行的。

const fs = require('fs')
const path = require('path')
const { ipcRenderer } = require('electron')
// const { compile } = require('./bytecode');

async function main() {
  // const inputPath = path.resolve(process.cwd(), 'dist-electron/preload');
  const outputPath = path.resolve(process.cwd(), 'dist-electron/preload')

  // const code = fs.readFileSync(path.resolve(inputPath, 'index.js'));
  // fs.writeFileSync(path.resolve(outputPath, `index.jsc`), compile(code));
  require('bytenode').compileFile({
    filename: 'dist-electron/preload/index.js' //它会在源文件同一目录下生成同名jsc后缀的字节码文件
  })
  // 将原先的 js 文件替换为固定格式：require('bytenode');require('./index.jsc');
  const str = `require('bytenode');require('./index.jsc');`
  // 如果文件不存在，先创建文件
  fs.writeFileSync(path.resolve(outputPath, `index.js`), str)
}

// 执行完成后需要关闭浏览器窗口，以便通知主进程编译已完成
main().then(() => ipcRenderer.send('close', true))
