import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from './App.jsx'
import Home from './pages/Home.jsx'
import LoginPage from './pages/LoginPage.jsx'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
      path:"/login",
      element:<LoginPage />
      }
    ]
  },
  
])

// ===== Rendering the App to the DOM =====
createRoot(document.getElementById('root')).render(
  <RouterProvider router={appRouter} />
)
