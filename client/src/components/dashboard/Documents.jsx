import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteDocument } from '../../actions/profile.action'

const Documents = ({documents, deleteDocument}) => {
    return (
        <Fragment>
            {documents.length>0 && (
                <Fragment>
                    <h2 className="my-2">Credential Documents</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents.map((doc=>(
                                <tr key={doc._id}>
                                    <td>{doc.title}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={()=>deleteDocument(doc._id)}>Delete</button>
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

Documents.propTypes = {
    documents:PropTypes.array.isRequired,
    deleteDocument:PropTypes.func.isRequired,
}

export default connect(null,{deleteDocument})(Documents)
