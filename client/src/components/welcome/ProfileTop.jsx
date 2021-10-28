import React from 'react'
import PropTypes from 'prop-types'

const ProfileTop = ({hostProfile:{location, phone, youtube, linkedIn, resume, host:{avatar, name, email}}}) => {
    return (
        <div className="profile-top p-2">
            <img className="round-img my-1" src={avatar} alt=""/>
            <h1 className="large">{name}</h1>
            <p>{email}</p>
            {phone && <p>{phone}</p>}
            {location && <p>{location}</p>}
            <div className="icons my-1">
            {youtube && (
                <a href={youtube} target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube fa-fx"></i></a>
            )}
            {linkedIn && (
                <a href={linkedIn} target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin fa-2x"></i></a>
            )}

            </div>
            {resume && (
                <a href={resume} className="lead" target="_blank" rel="noopener noreferrer">Resume</a>
            )}
        </div>
    )
}

ProfileTop.propTypes = {
    hostProfile:PropTypes.object.isRequired,
}

export default ProfileTop
