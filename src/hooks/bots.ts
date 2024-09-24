/**
 * Bots manager hooks
 */
import { useDispatch, useSelector } from 'react-redux'
import { BotData, NewBotData } from '@/type/bot'
import {
  addBot,
  removeBot,
  updateBot,
  setBotRunning,
  setBotStop,
  setBotRunningAll,
  setPlugins,
  removeInvalidPlugins,
  setAllBotStop
} from '@/store/bots'
import { ipcRenderer } from 'electron'
import { BotControllerEvent } from './ipc'
import usePlugins from './plugins'
import { PluginData } from '@/type/plugin'
import { App } from 'antd'
import useSettings from './settings'
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
const botsSelector = (state: any) => state.bots

const useBots = () => {
  const dispatch = useDispatch()
  const bots: BotData[] = useSelector(botsSelector)
  const settingsSlice = useSettings()
  const settings = settingsSlice.getConfig()
  const pluginsSlice = usePlugins()
  const plugins: PluginData[] = pluginsSlice.plugins
  const { message } = App.useApp()
  /**
   * 操作 reducer
   */
  const add = (bot: NewBotData) => {
    dispatch(addBot(bot))
  }

  const remove = (id: number) => {
    dispatch(removeBot(id))
  }

  const update = (bot: BotData) => {
    dispatch(updateBot(bot))
  }

  const setRunning = (id: number) => {
    dispatch(setBotRunning(id))
  }

  const setStop = (id: number) => {
    dispatch(setBotStop(id))
  }

  const setAllStop = () => {
    dispatch(setAllBotStop())
  }

  const setRunningAll = (ids: number[]) => {
    dispatch(setBotRunningAll(ids))
  }

  const setBotPlugins = (id: number, plugins: PluginData[]) => {
    dispatch(setPlugins({ id, plugins }))
  }

  const getBotPlugins = (id: number) => {
    dispatch(removeInvalidPlugins({ id, plugins }))
    const bot = bots.find((bot: BotData) => bot.id === id)
    if (!bot) return []
    if (!bot.plugins) return plugins
    return bot.plugins
  }

  const startAutoStartBot = async () => {
    await sleep(1000)
    const autoStartBots = bots.filter((bot: BotData) => bot.autoStart)
    autoStartBots.forEach(async (bot: BotData) => {
      try {
        await sleep(500)
        startBot(bot.id)
      } catch (error) {
        message.error(`Bot ${bot.name} 启动失败: ${error}`)
      }
    })
  }

  /**
   * 操作 ipc
   */
  const stopBot = (id: number) => {
    const bot = bots.find((bot: BotData) => bot.id === id)
    if (!bot) throw new Error('Bot not found')
    ipcRenderer.send(BotControllerEvent.stop, id)
  }

  const startBot = (id: number) => {
    let bot = bots.find((bot: BotData) => bot.id === id)
    if (!bot) throw new Error('Bot not found')
    const login = bot?.login
    if (!bot || !login || Object.keys(login).length === 0)
      throw new Error('请检查你的登录配置是否填写完整')
    const pluginList = getBotPlugins(id)
    let startData = {
      ...bot,
      plugins: pluginList,
      database: settings?.app?.database
    }
    ipcRenderer.send(BotControllerEvent.start, startData)
  }

  const updateAlemonCore = () => {
    ipcRenderer.send(BotControllerEvent.updateAlemon)
  }

  const addAllListner = () => {
    const stopListener = (_: Electron.IpcRendererEvent, id: number) => {
      setStop(id)
    }
    const startErrorListener = (
      _: Electron.IpcRendererEvent,
      errData: { id: number; name: string; error: string }
    ) => {
      const { id, name, error } = errData
      setStop(id)
    }
    const statusListener = (_: Electron.IpcRendererEvent, ids: number[]) => {
      setRunningAll(ids)
    }
    const startListener = (_: Electron.IpcRendererEvent, id: number) => {
      setRunning(id)
    }
    const updateAlemonListener = (_: Electron.IpcRendererEvent) => {
      ipcRenderer.send('app-info')
      message.success('Alemon Core 更新成功')
    }
    const updateAlemonCoreErrorListener = (_: Electron.IpcRendererEvent, msg: string) => {
      message.error('Alemon Core 更新失败: ' + msg)
    }
    ipcRenderer.on(BotControllerEvent.start, startListener)
    ipcRenderer.on(BotControllerEvent.status, statusListener)
    ipcRenderer.on(BotControllerEvent.startError, startErrorListener)
    ipcRenderer.on(BotControllerEvent.stop, stopListener)
    ipcRenderer.on(BotControllerEvent.updateAlemon, updateAlemonListener)
    ipcRenderer.on(BotControllerEvent.updateAlemonError, updateAlemonCoreErrorListener)
  }

  const removeAllListner = () => {
    ipcRenderer.removeAllListeners(BotControllerEvent.start)
    ipcRenderer.removeAllListeners(BotControllerEvent.status)
    ipcRenderer.removeAllListeners(BotControllerEvent.startError)
    ipcRenderer.removeAllListeners(BotControllerEvent.stop)
    ipcRenderer.removeAllListeners(BotControllerEvent.updateAlemon)
    ipcRenderer.removeAllListeners(BotControllerEvent.updateAlemonError)
  }

  return {
    bots,
    add,
    remove,
    update,
    setRunning,
    setStop,
    setRunningAll,
    setBotPlugins,
    getBotPlugins,
    stopBot,
    setAllStop,
    startBot,
    updateAlemonCore,
    addAllListner,
    removeAllListner,
    startAutoStartBot
  }
}

export default useBots
