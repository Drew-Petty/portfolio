import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileExperience = ({hostProfile:{experience}}) => {
    return (
        <div className="profile-exp" id="profile-exp">
            {experience.length>0 && (
                <Fragment>
                    <h2 className="text-primary my-1">Experience</h2>
                        { experience.map((exp, index)=>(
                            <div key={index}>
                                <h3>{exp.company}</h3>
                                <p><Moment format='MMMM YYYY'>{exp.from}</Moment> - {!exp.to?' present':<Moment format='MMMM YYYY'>{exp.to}</Moment>}</p>
                                <p><strong>Position:</strong> {exp.title}</p>
                                <p><strong>Description:</strong> {exp.description}</p>
                            </div>
                        ))}
                </Fragment>
            )}
        </div>
    )
}

ProfileExperience.propTypes = {
    hostProfile:PropTypes.object.isRequired,
}

export default ProfileExperience
