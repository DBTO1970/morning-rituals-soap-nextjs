import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

function Signin() {
    return (
        <div>
            <Head>
                <title>Sign-In Page</title>
            </Head>
            <form className='mx-auto my-4' style={{maxWidth: '500px'}} >
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                
                <button type="submit" className="btn btn-dark w-100">Sign In</button>
                
                <p className="my-2">Would you like to create an account? <Link href="/register"><a style={{color: 'crimson'}}> Register Now</a></Link></p>
                </form>

        </div>
    )
}

export default Signin
