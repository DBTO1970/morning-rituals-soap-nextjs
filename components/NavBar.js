/* eslint-disable @next/next/no-img-element */
import React, { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { DataContext } from '../store/GlobalState'
import Cookie from 'js-cookie'


function NavBar() {
    const router = useRouter()
    const { state, dispatch} = useContext(DataContext)
    const { auth, cart } = state



    const isActive = (r) => {
        if(r === router.pathname) {
            return "active"
        } else {
            return ""
        }
    }

    const handleLogout = () => {
        Cookie.remove('refreshtoken', {path: 'api/auth/accessToken'})
        localStorage.removeItem('firstLogin')
        dispatch({ type: 'AUTH', payload: {}})
        dispatch({ type: 'NOTIFY', payload: {success: 'Logged out!'}})
        return router.push('/')
    }

    const adminRouter = () => {
        return(
            <>
                <Link href="/users" passHref >
                    <a className="dropdown-item">Users</a>
                </Link>
                <Link href="/create" passHref >
                    <a className="dropdown-item">Products</a>
                </Link>
                <Link href="/categories" passHref >
                <a className="dropdown-item">Categories</a>
            </Link>
            </>
        )
    }


    const loggedRouter = () => {
        return (
            <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown">
                <img src={auth.user.avatar} alt={auth.user.avatar} 
                    style={{
                        borderRadius: '50%', width: '30px', height: '30px', transform: 'translateY(-3px)', marginRight: '3px', color: 'white'
                    }} />
                    <span className="user-name">{auth.user.name}</span>
            </a>

            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <Link href="/profile" passHref >
                <a className="dropdown-item">Profile</a>
            </Link>
           {
               auth.user.role === 'admin' && adminRouter() 
           }
            <Link href="#" passHref >
                <button className="dropdown-item" onClick={handleLogout} >Log Out</button>
            </Link>
            
            </div>
        </li>
        )
        
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{height:'auto' }}>
        <Link href="/">
            <a className="navbar-brand text-dark text-wrap" ><h1>Morning Rituals</h1></a>
        </Link>
            
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation" style={{color: 'white'}} >
                <span className="navbar-toggler-icon" ></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown" >
                <ul className="navbar-nav p-1">
                <li className="nav-item">
                        <Link href="/products">
                            <a className={"nav-link" + isActive('/products')} ><i className="fas fa-soap" ></i>  Soap</a>
                        </Link>
                        
                    </li>
                    <li className="nav-item">
                        <Link href="/about">
                            <a className={"nav-link" + isActive('/about')} ><i className="fas fa-info-circle" ></i>  About</a>
                        </Link>
                        
                    </li>
                    <li className="nav-item">
                        <Link href="/contact">
                            <a className={"nav-link" + isActive('/contact')} ><i className="fas fa-envelope" ></i>  Contact</a>
                        </Link>
                        
                    </li>
                    <li className="nav-item">
                        <Link href="/cart">
                            <a className={"nav-link" + isActive('/cart')} ><i className="fas fa-shopping-basket position-relative" aria-hidden >
                                <span className='position-absolute' style={{
                                    padding: '3px 6px',
                                    background: '#ed143dc2',
                                    borderRadius: '50%',
                                    top: '-10px',
                                    right: '-5px',
                                    color: 'white',
                                    fontSize: '14px'
                                }}>{cart.length}</span>
                            </i>  Basket</a>
                        </Link>
                        
                    </li>
                    {
                        Object.keys(auth).length === 0  
                        ? 
                        <li className="nav-item">
                        <Link href="/signin">
                            <a className={"nav-link" + isActive('/signin')} ><i className="fas fa-sign-in-alt" ></i>  Sign In</a>
                        </Link>
                        
                        </li>
                        : loggedRouter()
                    }

                    
                
                
                </ul>
            </div>
            
        </nav>
    )
}

export default NavBar
