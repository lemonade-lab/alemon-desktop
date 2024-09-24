import { RouteObject, Navigate } from 'react-router-dom'
import Home from '@/pages/Home/App'
import Header from '@/pages/Header'
import NotFound from '@/pages/NotFound'
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
