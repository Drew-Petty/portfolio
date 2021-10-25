import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { loadProfile } from '../../actions/profile.action'
import { loginHost } from '../../actions/auth.action'
import Alert from '../layout/Alert'



const Login = ({profile:{hostProfile}, loadProfile, loginHost, isAuthenticated}) => {
    useEffect(()=>{
        loadProfile()
    })
    const [formData, setFormData] =useState({})
    const onChangeHandler = e =>setFormData({...formData, [e.target.name]:e.target.value})
    const onSubmitHandler = e =>{
        e.preventDefault()
        loginHost(formData)
    }
    if(hostProfile ===null ){
        return <Redirect to='/register'/>
    }
    if(isAuthenticated){
        return <Redirect to='/dashboard'/>
    }
    return (
        <div className="basic-page">
            <Alert/>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign in to your account</p>
            <form action="dashboard.html" className="form" onSubmit={onSubmitHandler}>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" required onChange={onChangeHandler}/>
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Password" required name="password" onChange={onChangeHandler}/>
                </div>
                <input type="submit" value="Login" className="btn btn-primary" />
            </form>
        </div>
    )
}

Login.propTypes = {
    profile:PropTypes.object.isRequired,
    loadProfile:PropTypes.func.isRequired,
    loginHost:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool,
}
const mapStateToProps = state =>({
    profile:state.profile,
    isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps,{loadProfile, loginHost})(Login)
