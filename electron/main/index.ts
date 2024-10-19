import './env'
import { app, BrowserWindow, shell, ipcMain, screen, type Tray } from 'electron'
import { join } from 'node:path'
import urlHandler from 'url'

// Get the screen size
const getScreenSize = (): Electron.Size => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  return { width, height }
}

let win: BrowserWindow | null = null
let loginWin: BrowserWindow | null = null
let appTray: Tray | null

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
      preload,
      nodeIntegration: true,
      contextIsolation: false,
      devTools: !app.isPackaged
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

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
}

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
    // Open devTool if the app is not packaged
    // win.webContents.openDevTools();
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

  // Make all links open with the browser, not with the application
  loginWin.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })

  // when the login window closed, set loginWin null
  loginWin.on('closed', () => {
    loginWin = null
  })
}

// When app is ready, create the main window
app.whenReady().then(createWindow)

// When all windows are closed, quit the application
app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

// Prevent multiple instances of the app
app.on('second-instance', () => {
  if (win) {
    if (!win.isVisible()) win.show()
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

// Restore the main window if the user clicks on the app's dock icon
app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// open login window
ipcMain.on('open-login', () => {
  createLoginWindow()
})
