import React, {useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadProfile, deleteAccount } from '../../actions/profile.action'
import Education from './Education'
import Websites from './Websites'
import Experience from './Experience'
import Documents from './Documents'
import Alert from '../layout/Alert'


const Dashboard = ({loadProfile, deleteAccount, hostProfile}) => {
  useEffect(()=>{
    loadProfile()
  },[loadProfile])
    return (
        <div className="basic-page">
          <Alert/>
        <h1 className="large text-primary">Dashboard</h1>
        {hostProfile !==null && (<p className="lead"><i className="fas fa-user"></i> Welcome {hostProfile.host.name}</p>)}
        <div className="dash-buttons">
          <Link className="btn btn-primary m-1" to='/editProfile'><i className="fas fa-user-circle"></i> Edit Profile</Link>
          <Link className="btn btn-primary m-1" to='/addExperience'><i className="fab fa-black-tie"></i> Add Experience</Link>
          <Link className="btn btn-primary m-1" to='/addEducation'><i className="fas fa-graduation-cap"></i> Add Education</Link>
          <Link className="btn btn-primary m-1" to='/AddWebsite'><i className="fas fa-globe"></i> Add Website</Link>
          <Link className="btn btn-primary m-1" to='/AddDocument'><i className="fas fa-file"></i> Add Document</Link>
        </div>
        {hostProfile !==null && (
          <Fragment>
            <Experience experience={hostProfile.experience}/>
            <Education education={hostProfile.education}/>
            <Websites websites={hostProfile.websites}/>
            <Documents documents={hostProfile.documents}/>
          </Fragment>
        )}
      <div className="my-2">
        <button className="btn btn-danger" onClick={()=>deleteAccount()}><i className="fas fa-user-minus"></i> Delete My Account</button>
      </div>
    </div>
    )
}

Dashboard.propTypes = {
  loadProfile:PropTypes.func.isRequired,
  deleteAccount:PropTypes.func.isRequired,
}
const mapStateToProps = state =>({
  hostProfile:state.profile.hostProfile
})

export default connect(mapStateToProps,{loadProfile, deleteAccount})(Dashboard)
