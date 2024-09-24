/**
 * Bot Console manager hooks
 */
import { useDispatch, useSelector } from 'react-redux'
import {
  AConsoleState,
  ConsoleState,
  addLine,
  clearConsole,
  clearConsoleID,
  removeConsole
} from '@/store/console'
import { ipcRenderer } from 'electron'
import { BotControllerEvent } from './ipc'

const consoleSelector = (state: any) => state.console

const useConsole = () => {
  const dispatch = useDispatch()
  const consoles: ConsoleState[] = useSelector(consoleSelector)

  const add = (id: number, line: string) => {
    dispatch(
      addLine({
        id,
        console: line
      })
    )
  }

  const clearID = (id: number) => {
    dispatch(
      clearConsoleID({
        id
      })
    )
  }

  const remove = (id: number) => {
    dispatch(
      removeConsole({
        id
      })
    )
  }

  const clear = () => {
    dispatch(clearConsole())
  }

  const addAllListner = () => {
    const listener = (_: Electron.IpcRendererEvent, message: AConsoleState) => {
      add(message.id, message.console)
    }
    ipcRenderer.on(BotControllerEvent.log, listener)
  }
  const removeAllListner = () => {
    ipcRenderer.removeAllListeners(BotControllerEvent.log)
  }

  return {
    consoles,
    add,
    clear,
    clearID,
    remove,
    addAllListner,
    removeAllListner
  }
}

export default useConsole
