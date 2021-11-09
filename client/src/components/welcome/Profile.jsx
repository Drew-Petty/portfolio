import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileWebsites from './ProfileWebsites'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileContact from './ProfileContact'
import ProfileGitHub from './ProfileGitHub'

const Profile = ({hostProfile}) => {
    return (

        <div className="profile-grid my-1">
          <ProfileTop hostProfile={hostProfile}/>
          <ProfileAbout hostProfile={hostProfile}/>
          <ProfileWebsites hostProfile={hostProfile}/>
          <ProfileExperience hostProfile={hostProfile}/>
          <ProfileEducation hostProfile={hostProfile}/>
          <ProfileContact hostProfile={hostProfile}/>
          {hostProfile.githubUsername && (
            <ProfileGitHub hostProfile={hostProfile}/>
          )}
        </div>
    )
}

Profile.propTypes = {
  hostProfile:PropTypes.object.isRequired,
}

export default Profile
