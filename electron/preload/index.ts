import { contextBridge, ipcRenderer } from 'electron'
contextBridge.exposeInMainWorld('app', {
  getAppPath: () => ipcRenderer.invoke('get-app-path'),
  isTemplateExists: () => ipcRenderer.invoke('get-template-exists'),
  yarnInstall: () => ipcRenderer.invoke('yarn-install'),
  yarnAdd: (data: string) => ipcRenderer.invoke('yarn-add', data)
})
