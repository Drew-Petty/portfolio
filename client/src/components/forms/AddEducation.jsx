import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { addEducation } from '../../actions/profile.action'
import Alert from '../layout/Alert'

const AddEducation = ({addEducation, history}) => {
    const [formData, setFormData]= useState({
        current:false
    })
    const [toDateDisabled, toggleToDate]=useState(false)

    const {school, degree, fieldOfStudy, from, to, current, description} = formData

    const onChangeHandler = e =>setFormData({...formData, [e.target.name]:e.target.value})

    const onSubmitHandler = e =>{
        e.preventDefault()
        addEducation(formData, history)
    }

    return (
        <div className="basic-page">
            <Alert/>
            <h1 className="large text-primary">Add Your Education</h1>
            <p className="lead"><i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that you have attended</p>
            <small>* = required field</small>
            <form className="form" onSubmit={onSubmitHandler}>
                <div className="form-group">
                    <input type="text" placeholder="* School or Bootcamp" name="school" required value={school} onChange={onChangeHandler}/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Degree or Certificate" name="degree" required value={degree} onChange={onChangeHandler}/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Field Of Study" name="fieldOfStudy" value={fieldOfStudy} onChange={onChangeHandler}/>
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={onChangeHandler}/>
                </div>
                <div className="form-group">
                    <p><input type="checkbox" name="current" checked={current} onChange={e=>{
                        setFormData({...formData, current: !current})
                        toggleToDate(!toDateDisabled)
                    }} /> Current School</p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" value={to} onChange={onChangeHandler} disabled={toDateDisabled?'disable':''}/>
                </div>
                
                <div className="form-group">
                    <textarea name="description" cols="30" rows="5" placeholder="Program Description" value={description} onChange={onChangeHandler}></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link to='/dashboard' className="btn btn-light my-1" >Go Back</Link>
                
            </form>
        </div>
    )
}

AddEducation.propTypes = {
    addEducation:PropTypes.func.isRequired,
}

export default connect(null,{addEducation})(withRouter(AddEducation))
