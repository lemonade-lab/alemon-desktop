import './copy-temp'
import { app, BrowserWindow, shell, ipcMain, screen, type Tray } from 'electron'
import { release } from 'node:os'
import { join } from 'node:path'
import urlHandler from 'url'
// 定义进程变量
process.env.DIST_ELECTRON = join(__dirname, '../')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// Get the screen size
const getScreenSize = (): Electron.Size => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  return { width, height }
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null
let loginWin: BrowserWindow | null = null
let appTray: Tray | null

// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')

/**
 * main窗口
 */
const createWindow = () => {
  // Get the screen size
  const screenSize = getScreenSize()
  // Create the browser window.
  win = new BrowserWindow({
    width: parseInt((screenSize.width * 0.673).toFixed(0)),
    height: parseInt((screenSize.height * 0.673).toFixed(0)),
    minWidth: parseInt((screenSize.width * 0.5).toFixed(0)),
    minHeight: parseInt((screenSize.height * 0.6).toFixed(0)),
    title: 'AlemonJS',
    titleBarStyle: 'hidden',
    // titleBarOverlay: getTitleBarOverLayStyle(),
    icon: join(process.env.VITE_PUBLIC, 'favicon.ico'),
    // backgroundColor: getTitleBarOverLayStyle().color,
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
      devTools: !app.isPackaged
    }
  })
  // Hide the menu bar
  win.setMenuBarVisibility(false)
  // Load the HTML(URL when dev) of the app.
  if (url) {
    win.loadURL(url)
    // Open devTool if the app is not packaged
    // win.webContents.openDevTools();
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
 * login窗口
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
