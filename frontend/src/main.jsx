// React Router configuration and app entry point
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import VideoPlayer from "./pages/VideoPlayer";
import CreateChannel from "./pages/CreateChannel";
import Channel from "./pages/Channel";
import UploadVideo from "./components/UploadVideo";

// Router configuration with nested routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignIn /> },
      { path: "/video/:id", element: <VideoPlayer /> },
      { path: "/create-channel", element: <CreateChannel /> },
      { path: "/channel", element: <Channel /> },
      { path: "/upload-video", element: <UploadVideo /> },
    ],
  },
]);

// Render app with router
createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
