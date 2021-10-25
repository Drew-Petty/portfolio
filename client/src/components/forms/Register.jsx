import React, {useState, useEffect} from 'react'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { registerHost } from '../../actions/auth.action'
import { loadProfile } from '../../actions/profile.action'
import Alert from '../layout/Alert'


import PropTypes from 'prop-types'

const Register = ({profile:{hostProfile}, registerHost, loadProfile, isAuthenticated}) => {
    useEffect(()=>{
        loadProfile()
    })
    const [formData, setFormData] =useState({})
    const onChangeHandler = e =>setFormData({...formData, [e.target.name]:e.target.value})
    const onSubmitHandler = e =>{
        e.preventDefault()
        registerHost(formData)
    }
    if(hostProfile !==null ){
        return <Redirect to='/login'/>
    }
    if(isAuthenticated){
        return <Redirect to='/dashboard'/>
    }
    return (
        <div className="basic-page">
            <Alert/>
            <h1 className="large text-primary">Register</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Portfolio</p>
            <form action="dashboard.html" className="form" onSubmit={onSubmitHandler}>
                <div className="form-group">
                    <input type="text" name="name" placeholder="Name" required onChange={onChangeHandler}/>
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name='email' required onChange={onChangeHandler}/>
                    <small className="form-text">
                    This site uses Gravatar, so if you want a profile image, use a
                    Gravatar email
                    </small>
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Password" minLength="8" name="password" onChange={onChangeHandler}/>
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Confirm Password" minLength="8" name='confirm' onChange={onChangeHandler}/>
                </div>
                <input type="submit" value="Register" className="btn btn-primary" />
            </form>
        </div>
    )
}

Register.propTypes = {
    profile:PropTypes.object.isRequired,
    registerHost:PropTypes.func.isRequired,
    loadProfile:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool,
}
const mapStateToProps = state =>({
    profile:state.profile,
    isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps,{registerHost, loadProfile})(Register)
