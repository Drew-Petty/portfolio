import React, {useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getGithubRepos } from '../../actions/profile.action'
import Moment from 'react-moment'


const ProfileGitHub = ({hostProfile:{githubUsername}, getGithubRepos, repos}) => {

    useEffect(()=>{
        console.log('get github')
        getGithubRepos(githubUsername)
    },[getGithubRepos, githubUsername])

    return (
        <div className='profile-github' id="profile-github">
            {githubUsername && (
                <Fragment>
                    <h2 className="text-primary my-1"><i className="fab fa-github"></i> Github Repos / What I've been working on</h2>
                    {repos.map((repo)=>(
                        <div className="repo bg-white my-1 p-1" key={repo._id}>
                            <div>
                                <h4><a href={repo.html_url} target='_blank' rel='noopener noreferrer' >{repo.name}</a></h4>
                                <p>{repo.description}</p>
                                <p>Last updated on <Moment format='MMMM DD, YYYY'>{repo.pushed_at}</Moment></p>
                            </div>
                            <div>
                                <ul>
                                    <li className="badge badge-primary">Stars: {repo.stargazers_count}</li>
                                    <li className="badge badge-dark">Watchers: {repo.watchers_count}</li>
                                    <li className="badge badge-light">Forks: {repo.forks_count}</li>
                                </ul>
                            </div>
                        </div>
                    ))}
                
                </Fragment>
            )}
        </div>
    )
}

ProfileGitHub.propTypes = {
    hostProfile:PropTypes.object.isRequired,
    getGithubRepos:PropTypes.func.isRequired,

}
const mapStateToProps= state=>({
    repos:state.profile.repos
})

export default connect(mapStateToProps,{getGithubRepos})(ProfileGitHub)
