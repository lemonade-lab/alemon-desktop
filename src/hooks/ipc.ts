import useBots from './bots'
import useConsole from './console'
import usePlugins from './plugins'
import useApp from './app'

export enum PluginEvent {
  scan = 'scan-plugin',
  scanError = 'plugin-scan-error',
  install = 'install-plugin',
  installError = 'install-plugin-error',
  uninstall = 'uninstall-plugin',
  uninstallError = 'uninstall-plugin-error',
  update = 'update-plugin',
  updateError = 'update-plugin-error',
  updatePluginData = 'update-plugin-data',
  setPluginsDirectory = 'set-plugins-directory'
}

export enum BotControllerEvent {
  start = 'bot-start',
  stop = 'bot-stop',
  status = 'bot-status',
  startError = 'bot-start-error',
  stopError = 'bot-stop-error',
  log = 'bot-log',
  updateAlemon = 'update-alemon',
  updateAlemonError = 'update-alemon-error'
}

export enum AppEvent {
  checkForUpdates = 'check-for-updates',
  updateAvailable = 'update-available',
  updateNotAvailable = 'update-not-available',
  updateDownloaded = 'update-downloaded',
  updateError = 'update-error',
  updateDownloadProgress = 'update-download-progress',
  updateDownloadCancel = 'update-download-cancel',
  updateDownloadStart = 'update-download-start',
  restartAndUpdate = 'restart-and-update',

  autoLaunch = 'auto-launch',

  openFile = 'open-file',
  openFolder = 'open-folder',
  openUrl = 'open-url',
  locateFile = 'locate-file',

  confirmQuit = 'confirm-quit',
  hideToTray = 'hide-to-tray',

  changeTheme = 'change-theme',

  login = 'login',
  loginFailed = 'login-failed',
  getVerifyCode = 'get-verify-code',
  register = 'register',
  registerFailed = 'register-failed',
  sendEmailVerifyCode = 'send-email-verify-code',
  sendEmailVerifyCodeFailed = 'send-email-verify-code-failed'
}

export function useIPClistener() {
  const botsReducer = useBots()
  const consoleReducer = useConsole()
  const pluginsReducer = usePlugins()
  const alemonApp = useApp()
  const addAllListner = () => {
    /**
     * 监听控制台输出
     */
    consoleReducer.addAllListner()
    /**
     * 监听机器人
     */
    botsReducer.addAllListner()
    /**
     * 监听应用
     */
    pluginsReducer.addAllListner()
    /**
     * 监听App
     */
    alemonApp.addAllListeners()
  }

  const removeAllListeners = () => {
    /**
     * 监听控制台输出
     */
    consoleReducer.removeAllListner()
    /**
     * 监听机器人
     */
    botsReducer.removeAllListner()
    /**
     * 监听应用
     */
    pluginsReducer.removeAllListner()
    /**
     * 监听App
     */
    alemonApp.removeAllListeners()
  }
  return {
    addAllListner,
    removeAllListeners
  }
}
