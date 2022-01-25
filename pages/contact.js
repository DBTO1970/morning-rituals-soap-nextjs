import React from 'react'




function Contact() {



    const handleSubmit = (e) => {
        e.preventDefault()
        return(
            console.log('submit')
        )
    }

    return (
        <div className='container' >
            <h2>Contact Morning Rituals Soap</h2>
            <hr/>
                <form className='mx-auto my-4' style={{maxWidth: '500px'}} onSubmit={handleSubmit} >
                    <div className="form-group">
                        <label htmlFor="nameField">Name</label>
                        <input type="text" className="form-control" id="nameField" name="nameField" placeholder="You Name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="emailField">Email Address</label>
                        <input type="email" className="form-control" id="emailField" placeholder="name@example.com" />
                    </div>
                
                <div className="form-group">
                    <label htmlFor="textArea"></label>
                    <textarea className="form-control" id="textArea" rows="3" placeholder='How can we assist?'></textarea>
                </div>
                <div className="col-auto my-1">
                    <button type="submit" className="btn btn-info">Submit</button>
                </div>
            </form>
        </div>
        
    )
}

export default Contact
