import React, {useState, useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { editProfile, loadProfile } from '../../actions/profile.action'
import Alert from '../layout/Alert'


const EditProfile = ({profile:{hostProfile, profileLoading}, editProfile, loadProfile, history}) => {
    const [formData, setFormData] =useState({})
    const {location, githubUsername, linkedIn, youtube, phone, technologies, bio, resume}=formData
    const [displaySocialInputs, toggleSocialInputs]=useState(false)
    useEffect(()=>{
        loadProfile()
        setFormData({
            location: profileLoading || !hostProfile.location?'':hostProfile.location,
            githubUsername: profileLoading || !hostProfile.githubUsername?'':hostProfile.githubUsername,
            linkedIn: profileLoading || !hostProfile.linkedIn?'':hostProfile.linkedIn,
            youtube: profileLoading || !hostProfile.youtube?'':hostProfile.youtube,
            bio: profileLoading || !hostProfile.bio?'':hostProfile.bio,
            phone: profileLoading || !hostProfile.phone?'':hostProfile.phone,
            resume: profileLoading || !hostProfile.resume?'':hostProfile.resume,
            technologies: profileLoading || !hostProfile.technologies ? '': hostProfile.technologies.join(', ')
        })
    },[loadProfile, profileLoading])


    const onChangeHandler = e =>setFormData({...formData, [e.target.name]:e.target.value})

    const onSubmitHandler = e =>{
        e.preventDefault()
        editProfile(formData, history)
    }

    return (
        <div className="basic-page">
            <Alert/>
            <h1 className="large text-primary">Edit Your Portfolio</h1>
            <p className="lead"><i className="fas fa-user"></i> Let's get some information to make your Portfolio stand out</p>
            <form className="form" onSubmit={onSubmitHandler}>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={onChangeHandler}/>
                    <small className="form-text">City & state suggested (eg. Boston, MA)</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Phone Number" name='phone' value={phone} onChange={onChangeHandler}/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Technologies" name="technologies" value={technologies} onChange={onChangeHandler}/>
                    <small className="form-text">Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Github Username" name="githubUsername" value={githubUsername} onChange={onChangeHandler}/>
                    <small className="form-text">If you want your latest repos and a Github link, include your username</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Resume Google Doc" name="resume" value={resume} onChange={onChangeHandler}/>
                    <small className="form-text">If you want your resume displayed add a google doc link</small>
                </div>
                <div className="form-group">
                    <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={onChangeHandler}></textarea>
                    <small className="form-text">Tell us a little about yourself</small>
                </div>
                <div className="my-2">
                    <button onClick={()=>toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">Add Social Network Links</button>
                    <span>Optional</span>
                </div>
                {displaySocialInputs && <Fragment>
                    <div className="form-group social-input">
                        <i className="fab fa-youtube fa-2x"></i>
                        <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={onChangeHandler}/>
                    </div>
                    <div className="form-group social-input">
                        <i className="fab fa-linkedin fa-2x"></i>
                        <input type="text" placeholder="Linkedin URL" name="linkedIn" value={linkedIn} onChange={onChangeHandler}/>
                    </div>
                </Fragment>}
                <input type="submit" className="btn btn-primary my-1" />
                <Link to='/dashboard' className="btn btn-light my-1" >Go Back</Link>
            </form>
        </div>
    )
}
EditProfile.propTypes = {
    loadProfile:PropTypes.func.isRequired,
    editProfile:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
}
const mapStateToProps = state =>({
    profile:state.profile
})

export default connect(mapStateToProps, { loadProfile, editProfile })(withRouter(EditProfile))
