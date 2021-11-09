import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth.action'

const Navbar = ({auth:{authLoading, isAuthenticated}, profile:{hostProfile, profileLoading}, logout}) => {

    const authLinks = (
        <ul>
            <li>
                <a href="#!" onClick={logout}><i className="fas fa-sign-out-alt"></i> <span className="hide-sm">Logout</span></a>
            </li>
        </ul>
    )
    const guestLinks = (
        <ul>
            <li><a href="#profile-about">About</a></li>
            <li><a href="#profile-web">Websites</a></li>
            <li><a href="#profile-edu">Education</a></li>
            <li><a href="#profile-exp">Experience</a></li>
            <li><a href="#profile-contact">Contact</a></li>
            <li><a href="#profile-github">GitHub</a></li>


            {hostProfile!==null || profileLoading=== true?<li><Link to='/login'>Admin Login</Link></li>:<li><Link to='/register'>Register</Link></li>}
        </ul>
    )

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to='/'><i className="fas fa-book-open"></i> Portfolio</Link>
            </h1>
            {!authLoading && (<Fragment>{isAuthenticated?authLinks:guestLinks}</Fragment>)}
        </nav>
    )
}

Navbar.propTypes = {
    logout:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, {logout})(Navbar)
