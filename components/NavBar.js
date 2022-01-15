import React, { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { DataContext } from '../store/GlobalState'


function NavBar() {
    const router = useRouter()
    const { state, dispatch} = useContext(DataContext)
    const { auth } = state



    const isActive = (r) => {
        if(r === router.pathname) {
            return "active"
        } else {
            return ""
        }
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link href="/">
            <a className="navbar-brand">Morning Rituals Soap</a>
        </Link>
            
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                <ul className="navbar-nav">
                <li className="nav-item">
                        <Link href="/products">
                            <a className={"nav-link" + isActive('/products')}><i className="fas fa-soap" aria-hidden="true"></i>  Soap</a>
                        </Link>
                        
                    </li>
                    <li className="nav-item">
                        <Link href="/about">
                            <a className={"nav-link" + isActive('/about')}><i className="fas fa-info-circle" aria-hidden="true"></i>  About</a>
                        </Link>
                        
                    </li>
                    <li className="nav-item">
                        <Link href="/contact">
                            <a className={"nav-link" + isActive('/contact')}><i className="fas fa-envelope" aria-hidden="true" ></i>  Contact</a>
                        </Link>
                        
                    </li>
                    <li className="nav-item">
                        <Link href="/cart">
                            <a className={"nav-link" + isActive('/cart')}><i className="fas fa-shopping-basket" aria-hidden="true"></i>  Basket</a>
                        </Link>
                        
                    </li>
                    {/* {
                        Object.keys(auth).length === 0 && 
                        
                    } */}

                    <li className="nav-item">
                        <Link href="/signin">
                            <a className={"nav-link" + isActive('/signin')}><i className="fas fa-sign-in-alt" aria-hidden="true"></i>  Sign In</a>
                        </Link>
                        
                        </li>
                
                {/* <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown">
                    User Name
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <Link href="#">
                        <a className="dropdown-item">Profile</a>
                    </Link>
                    <Link href="#">
                        <a className="dropdown-item">Favorites</a>
                    </Link>
                    <Link href="#">
                        <a className="dropdown-item">Orders</a>
                    </Link>
                    <Link href="/goodbye">
                        <a className="dropdown-item" >Log Out</a>
                    </Link>
                    
                    </div>
                </li> */}
                </ul>
            </div>
        </nav>
    )
}

export default NavBar
