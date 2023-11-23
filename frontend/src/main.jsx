import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Step1 from './pages/Step1'
import NotFound from './pages/NotFound'
import Step2 from './pages/Step2'

const router = createBrowserRouter([
  { path: '*', element: <NotFound/> },
  { path: '/', element: <Home/> },
  { path: '/search', element: <Step1/> },
  { path: '/order/form', element: <Step2/> },
  // { path: '/order/seat', element: <Step3/> },
  // { path: '/order/review', element: <Step4/> },
  // { path: '/order/pay/:id', element: <Step5/> },
  // { path: '/order/pay/:id/:payment', element: <Step5Pay/> },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
