import React from 'react'
import NavBar from './NavBar'
import Notify from './Notify'
import Footer from './Footer'

function Layout({children}) {
    return (
        <React.Fragment>
            <NavBar />
            <Notify />

            {children}
            <Footer />
        </React.Fragment>
    )
}

export default Layout
