import {createRoot} from 'react-dom/client'
import {App} from './components/App'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {Suspense} from 'react'

import {LazyAbout} from 'pages/about/About.lazy'
import {LazyShop} from 'pages/shop/Shop.lazy'

const root = document.getElementById('root')

const container = createRoot(root)

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/about',
        element: <h1><Suspense fallback="Loading..."><LazyAbout/></Suspense></h1>
      },
      {
        path: '/shop',
        element: <h1><Suspense fallback="Loading..."><LazyShop /></Suspense></h1>
      }
    ]
  }
])

container.render(<RouterProvider router={router} />)