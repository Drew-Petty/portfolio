import React, {useState, useRef} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { addWebsite } from '../../actions/profile.action'
import Alert from '../layout/Alert'


const AddWebsite = ({ addWebsite, history}) => {
    const [formData, setFormData]=useState({})
    const [file, setFile]=useState('')
    const filePicker = useRef(null)

    const {title, language, framework, description, url, demoLink, gitHubRepo}=formData


    const onChangeHandler = e =>setFormData({...formData, [e.target.name]:e.target.value})
    
    const onChangeFile = e =>{
        if(e.target.files && e.target.files[0]){
            let reader = new FileReader()
            reader.onload = e =>{
                const img = new Image()
                img.onload =()=>{
                }
                img.onerror =()=>{
                    return false
                }
                img.src = e.target.result
            }
            reader.readAsDataURL(e.target.files[0])
        }
        setFile(e.target.files[0])
    }

    const onClickHandler = e =>{
        e.preventDefault()
        filePicker.current.click()
    }

    const onSubmitHandler =e=>{
        e.preventDefault()
        addWebsite(file, formData, history)
    }

    return (
        <div className="basic-page">
            <Alert/>
            <h1 className="large text-primary">Add a Website</h1>
            <p className="lead"><i className="fas fa-globe"></i> Add any deployed websites that demonstrate your skills</p>
            <small>* = required field</small>
            <form className="form" onSubmit={onSubmitHandler}>
                <div className="form-group">
                    <input type="text" placeholder="* Title" name="title" required value={title} onChange={onChangeHandler}/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="URL" name="url" value={url} onChange={onChangeHandler}/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Demo Link URL" name="demoLink" value={demoLink} onChange={onChangeHandler}/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="GitHub Repo URL" name="gitHubRepo" value={gitHubRepo} onChange={onChangeHandler}/>
                </div>

                <div className="form-group">
                    <input type="text" placeholder="* Programing Language" name="language" required value={language} onChange={onChangeHandler}/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Programing Framework" name="framework" required value={framework} onChange={onChangeHandler}/>
                </div>

                <div className="form-group">
                    <button className="btn btn-primary" onClick={onClickHandler} >Add ThumbNail</button>
                    <input type="file" ref={filePicker} onChange={onChangeFile}/>
                    <p>{ file ===''?'* Image Required':file.name}</p>
                </div>
                <div className="form-group">
                    <textarea name="description" cols="30" rows="5" placeholder="Website Description" value={description} onChange={onChangeHandler}></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link to='/dashboard' className="btn btn-light my-1" >Go Back</Link>
            </form>
        </div>
    )
}

AddWebsite.propTypes = {
    addWebsite:PropTypes.func.isRequired,
}

export default connect(null,{addWebsite})(withRouter(AddWebsite))
