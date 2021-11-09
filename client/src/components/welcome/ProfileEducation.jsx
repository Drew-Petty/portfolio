import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileEducation = ({hostProfile:{education}}) => {
    return (
        <div className="profile-edu" id="profile-edu">
            {education.length > 0 && (
                <Fragment>
                    <h2 className="text-primary my-1">Education</h2>
                    {education.map((edu, index)=>(
                        <div key={index}>
                            <h3 className="text-dark">{edu.school}</h3>
                            <p><Moment format='MMMM YYYY'>{edu.from}</Moment> - {!edu.to?' Present':<Moment format='MMMM YYYY'>{edu.to}</Moment>}</p>
                            <p><strong>Degree</strong> {edu.degree}</p>
                            <p><strong>Field of Study</strong> {edu.fieldOfStudy}</p>
                            {edu.description && (
                                <p><strong>Description</strong> {edu.description}</p>
                            )}
                        </div>
                    ))}
                </Fragment>
            )}
        </div>
    )
}

ProfileEducation.propTypes = {
    hostProfile:PropTypes.object.isRequired,
}

export default ProfileEducation
