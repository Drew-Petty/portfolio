import React from 'react'
import { Link } from 'react-router-dom'

const Start = props => {
    return (
        <div className="basic-page">
            <h1 className="x-large">Portfolio Website</h1>
            <p className="lead">Register to make this site yours</p>
            <div className="buttons">
                <Link to='/register' className="btn btn-primary">Register</Link>
            </div>
        </div>
    )
}

export default Start
