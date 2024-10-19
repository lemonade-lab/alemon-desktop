import { Suspense } from 'react'
import { HashRouter } from 'react-router-dom'
import Router from '@src/routes/index'
import Loading from '@src/pages/Loading'
export default () => {
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
