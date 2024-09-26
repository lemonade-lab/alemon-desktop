import './index.scss'
import './preline'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { store } from '@/store'
import APP from '@/App'
//
const persistor = persistStore(store)
//
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <APP />
    </PersistGate>
  </Provider>
)
// j
// postMessage({ payload: 'removeLoading' }, '*')
