import { Outlet } from "react-router-dom"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"


const Layout = () => {
  return (
    <>
      <div className=" flex flex-col h-screen">
        <Header />
        <main className=" flex flex-1 items-center justify-center">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Layout