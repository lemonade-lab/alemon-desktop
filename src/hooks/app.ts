import { ipcRenderer } from 'electron'
import { AppEvent } from './ipc'
import { App } from 'antd'
import { setState, setUpdateState, setCheckingState, UpdateState } from '@/store/update'
import useSettings from './settings'
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import useLogin from './login'
const useApp = () => {
  const dispatch = useDispatch()
  const settingsSlice = useSettings()
  const loginSlice = useLogin()
  const state: UpdateState = useSelector((state: any) => state.update)
  const settingsRef = useRef(settingsSlice.getConfig())
  const { modal, message } = App.useApp()
  useEffect(() => {
    settingsRef.current = settingsSlice.getConfig()
  }, [settingsSlice.settings])
  const isBusy = () => {
    return state.checking || state.updating
  }

  const setUpdateStates = async (state: UpdateState) => {
    dispatch(setState(state))
  }

  const setUpdating = async (updating: boolean) => {
    dispatch(setUpdateState(updating))
  }

  const setChecking = async (checking: boolean) => {
    dispatch(setCheckingState(checking))
  }

  const checkForUpdates = () => {
    setChecking(true)
    ipcRenderer.send(AppEvent.checkForUpdates)
  }

  const updateNow = () => {
    setUpdating(true)
    ipcRenderer.send(AppEvent.updateDownloadStart)
  }

  const restartAndUpdate = () => {
    ipcRenderer.send(AppEvent.restartAndUpdate)
  }

  const autoLaunch = () => {
    ipcRenderer.send(AppEvent.autoLaunch)
  }

  const addAllListeners = () => {
    // 有更新
    ipcRenderer.on(AppEvent.updateAvailable, () => {
      setUpdateStates({ checking: false, updating: false })
      modal.confirm({
        title: '检测到更新',
        content: '现在更新吗？',
        onOk() {
          updateNow()
        }
      })
    })
    // 无更新
    ipcRenderer.on(AppEvent.updateNotAvailable, () => {
      setUpdateStates({ checking: false, updating: false })
      console.log('updateNotAvailable')
    })
    // 更新下载完成
    ipcRenderer.on(AppEvent.updateDownloaded, () => {
      setUpdateStates({ checking: false, updating: false })
      modal.confirm({
        title: '更新下载完成',
        content: '现在重启更新吗？',
        onOk() {
          restartAndUpdate()
        }
      })
    })
    // 更新错误
    ipcRenderer.on(AppEvent.updateError, (_, err: string) => {
      setUpdateStates({ checking: false, updating: false })
      message.error('更新失败：' + err)
    })
    // 更新下载进度
    ipcRenderer.on(AppEvent.updateDownloadProgress, () => {
      setUpdateStates({ checking: false, updating: true })
      console.log('updateDownloadProgress')
      // setBusy(true);
    })
    // 更新下载取消
    ipcRenderer.on(AppEvent.updateDownloadCancel, () => {
      setUpdateStates({ checking: false, updating: false })
      console.log('updateDownloadCancel')
    })
    // 更新下载开始
    ipcRenderer.on(AppEvent.updateDownloadStart, () => {
      setUpdateStates({ checking: true, updating: true })
      console.log('updateDownloadStart')
    })
    // 自启动
    ipcRenderer.on(AppEvent.autoLaunch, (_, arg) => {
      settingsSlice.set({
        app: {
          autoLaunch: arg
        }
      })
    })

    // 退出确认
    let confirm: any = null
    ipcRenderer.on(AppEvent.confirmQuit, () => {
      switch (settingsRef?.current?.app?.closeToTray) {
        case 2:
          ipcRenderer.send(AppEvent.confirmQuit)
          break
        case 3:
          ipcRenderer.send(AppEvent.hideToTray)
          break
        case 1:
        default:
          if (confirm) return
          confirm = modal.confirm({
            title: '确认退出',
            content: '是否退出程序？',
            zIndex: 99999,
            onOk() {
              ipcRenderer.send(AppEvent.confirmQuit)
            },
            afterClose() {
              confirm = null
            }
          })
          break
      }
    })

    // 登录
    ipcRenderer.on(AppEvent.login, (_, arg) => {
      if (!arg?.data) return
      message.success('登录成功')
      loginSlice.setToken(arg?.data)
    })
  }

  const removeAllListeners = () => {
    ipcRenderer.removeAllListeners(AppEvent.updateAvailable)
    ipcRenderer.removeAllListeners(AppEvent.updateNotAvailable)
    ipcRenderer.removeAllListeners(AppEvent.updateDownloaded)
    ipcRenderer.removeAllListeners(AppEvent.updateError)
    ipcRenderer.removeAllListeners(AppEvent.updateDownloadProgress)
    ipcRenderer.removeAllListeners(AppEvent.updateDownloadCancel)
    ipcRenderer.removeAllListeners(AppEvent.updateDownloadStart)
    ipcRenderer.removeAllListeners(AppEvent.autoLaunch)
    ipcRenderer.removeAllListeners(AppEvent.confirmQuit)
    ipcRenderer.removeAllListeners(AppEvent.login)
  }

  return {
    state,
    isBusy,
    setUpdating,
    setChecking,
    checkForUpdates,
    updateNow,
    setUpdateStates,
    autoLaunch,
    restartAndUpdate,
    addAllListeners,
    removeAllListeners
  }
}

export default useApp
