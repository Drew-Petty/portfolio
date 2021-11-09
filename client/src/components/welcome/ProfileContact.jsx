import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { contactMe } from '../../actions/email.action'
import { withRouter } from 'react-router'
import Alert from '../layout/Alert'


const ProfileContact = ({contactMe, history}) => {
    const [formData, setFormData]= useState({})

    const {email, subject, message} = formData

    const onChangeHandler = e =>setFormData({...formData, [e.target.name]:e.target.value})

    const onSubmitHandler = e =>{
        console.log('test')
        e.preventDefault()
        contactMe(formData, history)
        setFormData({
            email:"",
            subject:"",
            message:"",
        })
    }

    return (
        <div className="profile-contact p-1" id="profile-contact">
            <Alert/>
            <h2 className="text-primary">Contact Me</h2>
            <form className="form contact-form" onSubmit={onSubmitHandler}>
                <div className="form-group">
                    <input type="email" placeholder="Email" name='email' required value={email} onChange={onChangeHandler}/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Subject" name='subject' required value={subject} onChange={onChangeHandler}/>
                </div>
                <div className="form-group">
                    <textarea name="message" id="" cols="30" rows="10" placeholder="Message" required value={message} onChange={onChangeHandler}></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
            </form>
        </div>
    )
}

ProfileContact.propTypes = {
    contactMe: PropTypes.func.isRequired,
}

export default connect(null, {contactMe})(withRouter(ProfileContact))
