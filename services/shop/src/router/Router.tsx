import { createBrowserRouter } from 'react-router-dom'
import {App} from '../components/App'

import {Suspense} from 'react'

import {LazyShop} from 'pages/shop/Shop.lazy'

const routes = [
  {
    path: '/shop',
    element: <App />,
    children: [
      {
        path: '/shop/main',
        element: <h1><Suspense fallback="Loading..."><LazyShop /></Suspense></h1>
      },
      {
        path: '/shop/second',
        element: <h1><Suspense fallback="Loading..."><div>Second</div></Suspense></h1>
      }
    ]
  }
]

export const router = createBrowserRouter(routes)

export default routes