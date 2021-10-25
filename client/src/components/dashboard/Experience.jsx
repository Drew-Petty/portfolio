import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { deleteExperience } from '../../actions/profile.action'

const Experience = ({experience, deleteExperience}) => {
    return (
        <Fragment>
            {experience.length>0 && (
                <Fragment>
                    <h2 className="my-2">Experience Credentials</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Company</th>
                                <th className="hide-sm">Title</th>
                                <th className="hide-sm">Years</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {experience.map((exp=>(
                                <tr key={exp._id}>
                                    <td>{exp.company}</td>
                                    <td className="hide-sm">{exp.title}</td>
                                    <td className="hide-sm"><Moment format='MM/DD/YYYY'>{exp.from}</Moment> - {exp.to === null?(' Present'):(<Moment format="MM/DD/YYYY">{exp.to}</Moment>)}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={()=>deleteExperience(exp._id)}>Delete</button>
                                    </td>
                                </tr>
                            )))}
                        </tbody>
                    </table>
                </Fragment>
            )}
        </Fragment>
    )
}

Experience.propTypes = {
    experience:PropTypes.array.isRequired,
    deleteExperience:PropTypes.func.isRequired,
}

export default connect(null,{deleteExperience})(Experience)
