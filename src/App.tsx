
// import './App.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import OTPForm from "./components/OTPForm/OTPForm"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Signup"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import { ToastContainer } from "react-toastify"

function App() {

  const routes = createBrowserRouter([
    {
      path: "login",
      element: <Login />
    },
    {
      path: "signup",
      element: <Signup />
    },
    {
      path: "OTPForm",
      element: <OTPForm />
    },
    {
      path: "/",
      element: <ProtectedRoute><Layout /></ProtectedRoute>,
      children: [
        {
          path: "",
          element: <Home />
        },
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
      <ToastContainer/>
    </>
  )
}

export default App
