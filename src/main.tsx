// global
import './index.scss'
// view
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from '@src/store'
import APP from '@src/App'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <APP />
  </Provider>
)

declare global {
  interface Window {
    app: {
      getAppPath: () => Promise<string>
      isTemplateExists: () => Promise<{
        exists: boolean
      }>
      yarnInstall: () => Promise<void>
      yarnAdd: (name: string) => Promise<void>
      botRun: () => Promise<void>
      botClose: () => Promise<void>
      botIsRunning: () => Promise<boolean>
    }
  }
}
