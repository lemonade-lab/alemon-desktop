/**
 * App Settings Hooks
 */
import { useDispatch, useSelector } from 'react-redux'
import { setSettings, resetAll } from '@/store/settings'
import { initState } from '@/store/settings'
import _ from 'lodash'
import { Settings } from '@/type/settings'
import { useEffect, useState } from 'react'
import { ipcRenderer } from 'electron'
import { AppEvent } from './ipc'
const settingsSlice = (state: any) => state.settings

const useSettings = () => {
  const dispatch = useDispatch()
  const [theme, setTheme] = useState('light')
  const settings: Settings = useSelector(settingsSlice)
  const set = (settings: Settings) => {
    dispatch(setSettings(settings))
  }
  const reset = () => {
    dispatch(resetAll())
  }
  const getConfig = () => {
    // 合并默认配置，防止配置文件缺少字段
    const config: Settings = _.merge(_.cloneDeep(initState), _.cloneDeep(settings))
    return config
  }

  return {
    settings,
    set,
    reset,
    getConfig,
    theme,
    setTheme
  }
}

export default useSettings
