/**
 * Bot Plugins manager hooks
 */
import { useDispatch, useSelector } from 'react-redux'
import {
  setPlugins,
  addPlugin,
  removePlugin,
  clearPlugins,
  updatePluginData
} from '@/store/plugins'
import { PluginData } from '@/type/plugin'
import { ipcRenderer } from 'electron'
import { PluginEvent } from './ipc'
import { App } from 'antd'
import { Settings } from '@/type/settings'

const pluginSelector = (state: any) => state.plugins
const settingSelector = (state: any) => state.settings
const usePlugins = () => {
  const dispatch = useDispatch()
  const plugins: PluginData[] = useSelector(pluginSelector)
  const settings: Settings = useSelector(settingSelector)
  const { modal, message } = App.useApp()
  /**
   * 操作 reducer
   */
  const add = (data: PluginData) => {
    dispatch(
      addPlugin({
        ...data
      })
    )
  }

  const remove = (data: PluginData) => {
    dispatch(
      removePlugin({
        ...data
      })
    )
  }

  const set = (data: PluginData[]) => {
    dispatch(setPlugins([...data]))
  }

  const clear = () => {
    dispatch(clearPlugins())
  }

  const updateData = (data: PluginData) => {
    dispatch(updatePluginData(data))
  }

  /**
   * utils
   */
  const exists = (data: PluginData) => {
    return plugins.findIndex(plugin => plugin.name === data.name) !== -1
  }

  /**
   * 操作 ipc
   */
  const scan = () => {
    clear()
    ipcRenderer.send(PluginEvent.scan, settings?.plugins?.directory || '')
  }

  const install = (data: PluginData) => {
    ipcRenderer.send(PluginEvent.install, data)
  }

  const uninstall = (data: PluginData) => {
    ipcRenderer.send(PluginEvent.uninstall, data)
  }

  const update = (data: PluginData) => {
    ipcRenderer.send(PluginEvent.update, data)
  }

  /**
   * 监听 ipc
   */

  const addAllListner = () => {
    /**
     * 1. 监听应用扫描
     */
    scan()
    const listener = (_: Electron.IpcRendererEvent, plugins: PluginData[]) => {
      set(plugins)
    }
    ipcRenderer.on(PluginEvent.scan, listener)
    /**
     * 2. 监听应用扫描失败
     */
    const scanErrorListener = (_: Electron.IpcRendererEvent, error: string) => {
      modal.error({
        title: '扫描应用失败',
        content: error
      })
    }
    ipcRenderer.on(PluginEvent.scanError, scanErrorListener)
    /**
     * 3. 监听应用安装
     */
    const installListener = (_: Electron.IpcRendererEvent, plugin: PluginData) => {
      message.success(`应用 ${plugin.name} 安装完毕`)
      add(plugin)
    }
    ipcRenderer.on(PluginEvent.install, installListener)
    /**
     * 4. 监听应用安装失败
     */
    const installErrorListener = (_: Electron.IpcRendererEvent, error: string) => {
      modal.error({
        title: '安装应用失败',
        content: error
      })
    }
    ipcRenderer.on(PluginEvent.installError, installErrorListener)
    /**
     * 5. 监听应用卸载
     */
    const uninstallListener = (_: Electron.IpcRendererEvent, plugin: PluginData) => {
      message.success(`应用 ${plugin.name} 卸载完毕`)
      remove(plugin)
    }
    ipcRenderer.on(PluginEvent.uninstall, uninstallListener)
    /**
     * 6. 监听应用卸载失败
     */
    const uninstallErrorListener = (_: Electron.IpcRendererEvent, error: string) => {
      modal.error({
        title: '卸载应用失败',
        content: error
      })
    }
    ipcRenderer.on(PluginEvent.uninstallError, uninstallErrorListener)
    /**
     * 7. 监听应用更新
     */
    const updateListener = (_: Electron.IpcRendererEvent, plugin: PluginData) => {
      message.success(`应用 ${plugin.name} 更新完毕`)
    }
    ipcRenderer.on(PluginEvent.update, updateListener)
    /**
     * 8. 监听应用更新失败
     */
    const updateErrorListener = (_: Electron.IpcRendererEvent, error: string) => {
      modal.error({
        title: '更新应用失败',
        content: error
      })
    }
    ipcRenderer.on(PluginEvent.updateError, updateErrorListener)
    /**
     * 13. 监听主动更新
     */
    const updatePluginDataListener = (_: Electron.IpcRendererEvent, plugin: PluginData) => {
      updateData(plugin)
    }
    ipcRenderer.on(PluginEvent.updatePluginData, updatePluginDataListener)
  }

  const removeAllListner = () => {
    ipcRenderer.removeAllListeners(PluginEvent.scan)
    ipcRenderer.removeAllListeners(PluginEvent.scanError)
    ipcRenderer.removeAllListeners(PluginEvent.install)
    ipcRenderer.removeAllListeners(PluginEvent.installError)
    ipcRenderer.removeAllListeners(PluginEvent.uninstall)
    ipcRenderer.removeAllListeners(PluginEvent.uninstallError)
    ipcRenderer.removeAllListeners(PluginEvent.update)
    ipcRenderer.removeAllListeners(PluginEvent.updateError)
    ipcRenderer.removeAllListeners(PluginEvent.updatePluginData)
  }

  return {
    plugins,
    add,
    remove,
    set,
    exists,
    scan,
    clear,
    updateData,
    install,
    uninstall,
    update,
    addAllListner,
    removeAllListner
  }
}

export default usePlugins
