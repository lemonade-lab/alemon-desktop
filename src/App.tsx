import { Suspense, useEffect } from 'react'
import { HashRouter } from 'react-router-dom'
import Router from '@/routes/index'
import { useIPClistener } from '@/hooks/ipc'
import useApp from '@/hooks/app'
import useSettings from '@/hooks/settings'
import useBots from '@/hooks/bots'
import Loading from '@/pages/Loading'
export default () => {
  const ipc = useIPClistener()
  const alemonApp = useApp()
  const settingsSlice = useSettings()
  const botsSlice = useBots()
  useEffect(() => {
    alemonApp.setUpdateStates({ checking: false, updating: false })
    if (settingsSlice.getConfig()?.app?.autoCheckUpdate) alemonApp.checkForUpdates()
  }, [])
  useEffect(() => {
    ipc.addAllListner()
    return () => {
      ipc.removeAllListeners()
    }
  }, [])
  useEffect(() => {
    botsSlice.setAllStop()
    botsSlice.startAutoStartBot()
  }, [])
  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="w-screen h-screen">
            <Loading />
          </div>
        }
      >
        <Router />
      </Suspense>
    </HashRouter>
  )
}
