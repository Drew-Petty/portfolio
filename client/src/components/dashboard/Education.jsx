import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { deleteEducation } from '../../actions/profile.action'

const Education = ({education, deleteEducation}) => {
    return (
        <Fragment>
            {education.length>0 && (
                <Fragment>
                    <h2 className="my-2">Education Credentials</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>School</th>
                                <th className="hide-sm">Degree</th>
                                <th className="hide-sm">Years</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {education.map((edu=>(
                                <tr key={edu._id}>
                                    <td>{edu.school}</td>
                                    <td className="hide-sm">{edu.degree}</td>
                                    <td className="hide-sm"><Moment format='MM/DD/YYYY'>{edu.from}</Moment> - {edu.to === null?(' Present'):(<Moment format="MM/DD/YYYY">{edu.to}</Moment>)}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={()=>deleteEducation(edu._id)}>Delete</button>
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

Education.propTypes = {
    education:PropTypes.array.isRequired,
    deleteEducation:PropTypes.func.isRequired,
}

export default connect(null,{deleteEducation})(Education)
