import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { addDocument } from '../../actions/profile.action'
import Alert from '../layout/Alert'

const AddDocument = ({addDocument, history}) => {
    const [formData, setFormData]= useState({})

    const {title, googleDocLink} = formData

    const onChangeHandler = e =>setFormData({...formData, [e.target.name]:e.target.value})

    const onSubmitHandler = e =>{
        e.preventDefault()
        addDocument(formData, history)
    }
    return (
        <div className="basic-page">
            <Alert/>
            <h1 className="large text-primary">Add a Certification Document</h1>
            <p className="lead"><i className="fas fa-file"></i> link to any Google Document</p>
            <small>* = required field</small>
            <form className="form" onSubmit={onSubmitHandler}>
                <div className="form-group">
                    <input type="text" placeholder="* Certification" name="title" required value={title} onChange={onChangeHandler}/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Google doc URL" name="googleDocLink" required value={googleDocLink} onChange={onChangeHandler}/>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link to='/dashboard' className="btn btn-light my-1" >Go Back</Link>
            </form>
        </div>
    )
}

AddDocument.propTypes = {
    addDocument:PropTypes.func.isRequired,
}

export default connect(null,{addDocument})(withRouter(AddDocument))
