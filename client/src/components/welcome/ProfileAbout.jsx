import React, {Fragment} from 'react'
import PropTypes from 'prop-types'


const ProfileAbout = ({hostProfile:{bio, technologies}}) => {

    return (
        <div className="profile-about">
            {bio && (
                <Fragment>
                    <h2 className="text-primary">Bio</h2>
                    <p className="m-1">{bio}</p>
                </Fragment>
            )}
            {technologies.length>0 && (
                <Fragment>
                    <h2 className="text-primary">Skill Set</h2>
                    <div className="skills">
                        {technologies.map((tech, index)=>(
                            <div className="p-1" key={index}><i className="fas fa-check"></i> {tech}</div>
                        ))}
                    </div>
                </Fragment>
            )}
        </div>
    )
}

ProfileAbout.propTypes = {
    hostProfile:PropTypes.object.isRequired,
}

export default ProfileAbout
