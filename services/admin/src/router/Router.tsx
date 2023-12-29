import {App} from '../components/App'
import { createBrowserRouter } from 'react-router-dom'

import {Suspense} from 'react'

import {LazyAbout} from 'pages/about/About.lazy'

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/about',
        element: <h1><Suspense fallback="Loading..."><LazyAbout/></Suspense></h1>
      },
    ]
  }
]

export const router = createBrowserRouter(routes)

export default routes