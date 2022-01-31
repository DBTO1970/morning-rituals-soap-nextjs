import React, { useState } from 'react'
import Head from 'next/head'

import { useRouter } from 'next/router'
// import SimpleReactValidator from 'simple-react-validator'


function Contact() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const router = useRouter()

    // const validator= () => new SimpleReactValidator()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            name, 
            email, 
            message
        }

        fetch('/api/contact/contact', {
            method: 'POST',
            body: JSON.stringify(data),
        })

        
        router.push('/')

    }

    return (
        <div className='container' >
        <Head>
            <title>Contact Page</title>
        </Head>
            <h2>Contact Morning Rituals Soap</h2>

                <form className='mx-auto my-4' style={{maxWidth: '500px'}} onSubmit={handleSubmit} >
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="name" 
                            name="name" 
                            placeholder="You Name" 
                            onChange={e => setName(e.target.value)} 
                            required 
                            />
                            {/* {validator('name', name, 'required|alpha')} */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            placeholder="name@example.com" 
                            onChange={e => setEmail(e.target.value)} 
                            required 
                            />
                            {/* {validator('email', email, 'required|email', { className: 'text-danger' })} */}
                    </div>
                
                <div className="form-group">
                    <label htmlFor="message"></label>
                    <textarea 
                        className="form-control" 
                        id="message" 
                        rows="3" 
                        
                        placeholder='How can we assist?' 
                        type="text" 
                        onChange={e => setMessage(e.target.value)} 
                        required
                        />
                        {/* {validator('review', message.review, 'required|min:20|max:120')} */}
                </div>
                <div className="col-auto my-1">
                    <button type="submit" className="btn btn-info">Submit</button>
                </div>
            </form>
        </div>
        
    )
}

export default Contact
