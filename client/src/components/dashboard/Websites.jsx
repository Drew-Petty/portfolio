import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteWebsite } from '../../actions/profile.action'

const Websites = ({websites, deleteWebsite}) => {
    return (
        <Fragment>
            {websites.length> 0 && (
                <Fragment>
                    <h2 className="my-2">Deployed Websites</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th className="hide-sm">Language</th>
                                <th className="hide-sm">Framework</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {websites.map((web=>(
                                <tr key={web._id}>
                                    <td>{web.title}</td>
                                    <td className="hide-sm">{web.language}</td>
                                    <td className="hide-sm">{web.framework}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={()=>deleteWebsite(web._id)}>Delete</button>
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

Websites.propTypes = {
    websites:PropTypes.array.isRequired,
    deleteWebsite:PropTypes.func.isRequired,
}

export default connect(null,{deleteWebsite}) (Websites)
