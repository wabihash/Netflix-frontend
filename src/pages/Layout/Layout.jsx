import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import WelcomeModal from '../../components/WelcomeModal/WelcomeModal'

const Layout = () => {
  return (
    <>
        <Header />
        <WelcomeModal />
        <main>
            <Outlet />
        </main>
        <Footer />
    </>
  )
}

export default Layout
