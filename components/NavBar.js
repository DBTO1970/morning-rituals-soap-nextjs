import React, { useContext } from 'react'
import Link from 'next/link'
// import image from 'next/image'
import { useRouter } from 'next/router'
import { DataContext } from '../store/GlobalState'
import Cookie from 'js-cookie'


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

    const handleLogout = () => {
        Cookie.remove('refreshtoken', {path: 'api/auth/accessToken'})
        localStorage.removeItem('firstLogin')
        dispatch({ type: 'AUTH', payload: {}})
        dispatch({ type: 'NOTIFY', payload: {success: 'Logged out!'}})
    }


    const loggedRouter = () => {
        return (
            <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown">
                <img src={auth.user.avatar} alt={auth.user.avatar} 
                    style={{
                        borderRadius: '50%', width: '30px', height: '30px', transform: 'translateY(-3px)', marginRight: '3px', color: 'white'
                    }} />  {auth.user.name}
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <Link href="#">
                <a className="dropdown-item">Profile</a>
            </Link>
           
            <Link href="#">
                <button className="dropdown-item" onClick={handleLogout} >Log Out</button>
            </Link>
            
            </div>
        </li>
        )
        
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light xs-12" style={{backgroundImage: `url('./coffee_beans_banner.jpg')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height:'auto'}}>
        <Link href="/">
            <a className="navbar-brand" style={{color: 'white'}}><h1>Morning Rituals Soap</h1></a>
        </Link>
            
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation" style={{color: 'white'}} >
                <span className="navbar-toggler-icon" ></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown" >
                <ul className="navbar-nav">
                <li className="nav-item">
                        <Link href="/products">
                            <a className={"nav-link" + isActive('/products')} style={{color: 'white'}} ><i className="fas fa-soap" aria-hidden="true"></i>  Soap</a>
                        </Link>
                        
                    </li>
                    <li className="nav-item">
                        <Link href="/about">
                            <a className={"nav-link" + isActive('/about')} style={{color: 'white'}} ><i className="fas fa-info-circle" aria-hidden="true"></i>  About</a>
                        </Link>
                        
                    </li>
                    <li className="nav-item">
                        <Link href="/contact">
                            <a className={"nav-link" + isActive('/contact')} style={{color: 'white'}} ><i className="fas fa-envelope" aria-hidden="true" ></i>  Contact</a>
                        </Link>
                        
                    </li>
                    <li className="nav-item">
                        <Link href="/cart">
                            <a className={"nav-link" + isActive('/cart')} style={{color: 'white'}} ><i className="fas fa-shopping-basket" aria-hidden="true"></i>  Basket</a>
                        </Link>
                        
                    </li>
                    {
                        Object.keys(auth).length === 0  
                        ? 
                        <li className="nav-item">
                        <Link href="/signin">
                            <a className={"nav-link" + isActive('/signin')} style={{color: 'white'}} ><i className="fas fa-sign-in-alt" aria-hidden="true"></i>  Sign In</a>
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
