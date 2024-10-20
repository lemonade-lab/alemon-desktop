import './env'
import { app, BrowserWindow, shell, ipcMain, screen } from 'electron'
import { join } from 'node:path'
import urlHandler from 'url'
import './ipcMain'

// 获取屏幕尺寸
const getScreenSize = (): Electron.Size => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  return { width, height }
}

let win: BrowserWindow | null = null
let loginWin: BrowserWindow | null = null

const preload = join(__dirname, '../preload/index.js')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')

/**
 * 创建窗口
 */
const createWindow = () => {
  // 获取屏幕尺寸
  const screenSize = getScreenSize()
  // 创建浏览器窗口。
  win = new BrowserWindow({
    width: parseInt((screenSize.width * 0.673).toFixed(0)),
    height: parseInt((screenSize.height * 0.673).toFixed(0)),
    minWidth: parseInt((screenSize.width * 0.5).toFixed(0)),
    minHeight: parseInt((screenSize.height * 0.6).toFixed(0)),
    // 默认窗口标题。默认为"Electron"。
    // 如果 HTML 标签<title>是 在加载的 HTML 文件中定义loadURL()，该属性将被忽略。
    title: 'AlemonJS',
    // 窗口标题栏的样式。默认为default。可能的值为：
    titleBarStyle: 'hidden',
    // 窗口标题栏的颜色。默认为#000000。
    icon: join(process.env.VITE_PUBLIC, 'favicon.ico'),
    // 是否可以最小化窗口。默认为true。
    webPreferences: {
      preload
      // nodeIntegration: true,
      // contextIsolation: false,
      // devTools: !app.isPackaged
    }
  })

  // 隐藏菜单栏
  win.setMenuBarVisibility(false)

  // 加载应用的HTML(URL when dev)。
  if (url) {
    win.loadURL(url)
    // 如果应用没有打包，打开开发者工具
    win.webContents.openDevTools()
  } else {
    win.loadFile(indexHtml)
  }

  // 让所有链接都通过浏览器打开，而不是通过应用程序打开
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })

  //
}

// 当应用程序准备就绪时，创建主窗口
app.whenReady().then(() => {
  createWindow()
  // 设置应用的用户模型 ID
  // 替换为你的应用标识
  app.setAppUserModelId('com.alemonjs.desktop')
})

// 当所有窗口都关闭后，退出应用程序
app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

// 防止应用程序的多个实例
app.on('second-instance', () => {
  if (win) {
    if (!win.isVisible()) win.show()
    // 如果用户尝试打开另一个窗口，则聚焦于主窗口
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

// 如果用户单击应用程序的停靠栏图标，则恢复主窗口
app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

/**
 *
 * @returns
 */
const createLoginWindow = () => {
  if (!win) return
  // Get the screen size
  const screenSize = getScreenSize()
  // Create the browser window.
  loginWin = new BrowserWindow({
    width: parseInt((screenSize.width * 0.25).toFixed(0)),
    height: parseInt((screenSize.height * 0.6).toFixed(0)),
    title: 'AlemonJS 登录',
    titleBarStyle: 'hidden',
    // titleBarOverlay: getTitleBarOverLayStyle(),
    icon: join(process.env.VITE_PUBLIC, 'favicon.ico'),
    minimizable: false,
    // backgroundColor: getTitleBarOverLayStyle().color,
    parent: win,
    modal: true,
    maximizable: false,
    resizable: false,
    webPreferences: {
      // preload,
      nodeIntegration: true,
      contextIsolation: false,
      devTools: !app.isPackaged
    }
  })
  // Hide the menu bar
  loginWin.setMenuBarVisibility(false)
  // Load the HTML(URL when dev) of the app.
  if (url) {
    loginWin.loadURL(`${url}/#/login`)
    // Open 如果应用未打包，请打开 devTool
    win.webContents.openDevTools()
  } else {
    // loginWin.loadFile(`${indexHtml}/#/login`);
    loginWin.loadURL(
      urlHandler.format({
        pathname: indexHtml,
        protocol: 'file:',
        hash: '/login',
        slashes: true
      })
    )
  }

  //  让所有链接都通过浏览器打开，而不是通过应用程序打开
  loginWin.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })

  // 当登录窗口关闭时，设置loginWin null
  loginWin.on('closed', () => {
    loginWin = null
  })
}

// 打开登录窗口
ipcMain.on('open-login', () => {
  createLoginWindow()
})
