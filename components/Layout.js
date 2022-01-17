import React from 'react'
import NavBar from './NavBar'
import Notify from './Notify'


function Layout({children}) {
    return (
        <>
            <NavBar />
            <Notify />

            {children}
        </>
    )
}

export default Layout
