import React ,{Fragment} from 'react'
import PropTypes from 'prop-types'

const ProfileWebsites = ({hostProfile:{websites}}) => {
    return (
        <Fragment>
            {websites.length>0 && (
                <div className="profile-web" id="profile-web">
                    <h2 className="text-primary">Websites</h2>
                    <div className="websites my-2">
                        {websites.map((web, index)=>(
                            <div key={index} className="website bg-light">
                                <img src={`/backend/uploads/${web.filename}`} alt={web.filename} />
                                <h3 className="text-primary">{web.title}</h3>
                                <p><strong>Language:</strong> {web.language}</p>
                                <p><strong>Framework:</strong> {web.framework}</p>
                                {web.description !== 'undefined' && (
                                    <p><strong>Description:</strong> {web.description}</p>
                                )}
                                <div className="buttons">
                                    {web.demoLink !== "undefined" &&<a href={web.demoLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary my-1"><i className="fas fa-film"></i> View Demo</a>}
                                    {web.url !== "undefined" && <a href={web.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary my-1"><i className="fas fa-globe"></i> Go to Site</a>}
                                    {web.gitHubRepo !== "undefined" && <a href={web.gitHubRepo} target="_blank" rel="noopener noreferrer" className="btn btn-dark"><i className="fab fa-github"></i> GitHub Repo</a>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
        </Fragment>
    )
}

ProfileWebsites.propTypes = {
    hostProfile:PropTypes.object.isRequired,
}

export default ProfileWebsites
