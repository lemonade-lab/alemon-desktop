import { RouteObject, Navigate } from 'react-router-dom'
import Home from '@src/pages/Home/App'
// Header
import Header from '@src/pages/Header'
import NotFound from '@src/pages/NotFound'
// Outlet
import { Outlet } from 'react-router-dom'
export default [
  {
    path: '/',
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
] as RouteObject[]
