import React, {useEffect, Fragment}  from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'
import { loadProfile } from '../../actions/profile.action'
import Spinner from '../layout/Spinner'
import Start from './Start'
import Profile from './Profile'
import Alert from '../layout/Alert'

const Welcome = ({ isAuthenticated, loadProfile, profile:{hostProfile, profileLoading} }) => {
    useEffect(()=>{
        loadProfile()
    },[loadProfile])
    if(isAuthenticated){
        return <Redirect to='/dashboard'/>
    }
    return profileLoading ? (
        <Spinner/>
    ):(
        <Fragment>
        {hostProfile !== null?(<Profile hostProfile={hostProfile}/>):(<Start/>)}
        </Fragment>
    )
}

Welcome.propTypes = {
    isAuthenticated:PropTypes.bool,
    loadProfile:PropTypes.func.isRequired,
}

const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated,
    profile: state.profile
})

export default connect(mapStateToProps,{loadProfile})(Welcome)
