import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import SignIn from './pages/SignIn.jsx'
import VideoPlayer from './pages/VideoPlayer.jsx'
import CreateChannel from './components/CreateChannel.jsx'
import Channel from './pages/Channel.jsx'

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
      element:<Login />
      },
      {
        path:"/signup",
        element:<SignIn/>
      },
      {
        path:"/video/:id",
        element:<VideoPlayer/>
      },
      {
        path:"/create-channel",
        element:<CreateChannel/>
      },
      {
        path:"/channel",
        element:<Channel/>
      }
    ]
  },
  
])

// ===== Rendering the App to the DOM =====
createRoot(document.getElementById('root')).render(
  <RouterProvider router={appRouter} />
)
