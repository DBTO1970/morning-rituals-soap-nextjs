import Link from 'next/link'
import Head from 'next/head'
import { useState, useContext } from 'react'
import valid from '../utils/valid'
import { DataContext } from '../store/GlobalState'

const Register = () => {
    const initialState = { name: '', email: '', password: '', cf_password: '' }
    const [ userData, setUserData] = useState(initialState)
    const { name, email, password, cf_password} = userData

    const {state, dispatch} = useContext(DataContext)

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUserData({...userData, [name]:value})
        dispatch({ type: 'NOTIFY', payload: {} })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const errMsg = valid(name, email, password, cf_password)
        if(errMsg) return dispatch({ type: 'NOTIFY', payload: {error: errMsg} })

        dispatch({ type: 'NOTIFY', payload: {success: 'OK'} })
    }

    return(
        <div>
        <Head>
                <title>Registration Page</title>
            </Head>
             <form className='mx-auto my-4' style={{maxWidth: '500px'}} onSubmit={handleSubmit}>
                <div className='form-group'>
                <label htmlFor="exampleInputPassword1">Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        name="name" 
                        placeholder="What's your name?" 
                        value={name} 
                        onChange={handleChangeInput}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input 
                    type="email" 
                    className="form-control" 
                    id="exampleInputEmail1" 
                    aria-describedby="emailHelp" 
                    placeholder="Enter email" 
                    name="email" 
                    value={email} 
                    onChange={handleChangeInput}
                    />
                    <small id="emailHelp" className="form-text text-muted">We&apos;ll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Must be 6-10 alphanumeric and special characters" 
                    name="password" 
                    value={password} 
                    onChange={handleChangeInput}
                    />
                    <br />
                    <label htmlFor="exampleInputPassword2">Confirm Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Re-enter Password" 
                    name="cf_password" 
                    value={cf_password} 
                    onChange={handleChangeInput}
                    />
                </div>
                
                <button type="submit" className="btn btn-dark w-100">Register</button>
                <p className="my-2">Already have an account? <Link href="/signin"><a style={{color: 'crimson'}}> Sign In</a></Link></p>
                </form>
        </div>
    )
}

export default Register