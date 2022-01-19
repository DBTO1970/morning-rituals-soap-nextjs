import React from 'react'
import NavBar from './NavBar'
import Notify from './Notify'
import Modal from './Modal'
import Footer from './Footer'

function Layout({children}) {
    return (
        <React.Fragment>
            <NavBar />
            <Notify />
            <Modal />
            {children}
            <Footer />
        </React.Fragment>
    )
}

export default Layout
