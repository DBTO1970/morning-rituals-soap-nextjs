import React from 'react'




function Contact() {



    

    return (
        <div className='container' style={{alignContent: 'center', justifyContent: 'center', margin: '2rem' }}>
        <h1>Contact Morning Rituals Soap</h1>
        <hr/>
            <form>
                <div className="form-group">
                    <label htmlFor="nameField">Email address</label>
                    <input type="text" className="form-control" id="nameField" name="nameField" placeholder="You Name" />
                </div>
                <div className="form-group">
                    <label htmlFor="emailField">Email address</label>
                    <input type="email" className="form-control" id="emailField" placeholder="name@example.com" />
                </div>
            
            <div className="form-group">
                <label htmlFor="textArea"></label>
                <textarea className="form-control" id="textArea" rows="3" placeholder='How can we assist?'></textarea>
            </div>
            <div className="col-auto my-1">
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
        </div>
        
    )
}

export default Contact
