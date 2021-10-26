import axios from 'axios'
import { PROFILE_LOADED, PROFILE_MISSING, PROFILE_ERROR, UPDATE_PROFILE, ACCOUNT_DELETED, CLEAR_PROFILE, GET_REPOS } from './actionTypes'
import { setAlert } from './alert.action' 
const backend ="/backend/"


export const loadProfile = () => async dispatch =>{
    try {
        const res = await axios.get(backend+'api/host/profile')
        if(res.data){
            dispatch({
                type:PROFILE_LOADED,
                payload:res.data
            })
        }else{
            dispatch({
                type:PROFILE_MISSING
            })
        }
        
    } catch (error) {
        console.log(error)
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}

        })
    }
}

export const getGithubRepos = username => async dispatch=>{
    try {
        const res = await axios.get(backend+`api/host/repos/${username}`)
        dispatch({
            type:GET_REPOS,
            payload:res.data
        })

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}

        })
    }
}

export const editProfile = (formData, history) => async dispatch =>{
    try {
        const config ={
            headers:{
                'Content-Type': 'application/json'
            }
        }
        console.log(formData)
        const res = await axios.post(backend+'api/host/profile', formData, config)
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('Profile Updated','success'))
        history.push('/dashboard')

    } catch (error) {
        const errors = error.response.data.errors
        if(errors){
            errors.forEach(err => dispatch(setAlert(err.msg,'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}
export const addExperience = (formData, history)=> async dispatch=>{
    try {
        const config ={
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put(backend+'api/host/experience',formData,config)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Experience added','success'))
        history.push('/dashboard')
    } catch (error) {
        const errors = error.response.data.errors
        if(errors){
            errors.forEach(err => dispatch(setAlert(err.msg,'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

export const addEducation = (formData, history)=> async dispatch=>{
    try {
        const config ={
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put(backend+'api/host/education', formData, config)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Education added','success'))
        history.push('/dashboard')
    } catch (error) {
        const errors = error.response.data.errors
        if(errors){
            errors.forEach(err => dispatch(setAlert(err.msg,'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

export const addWebsite = (file, fields, history)=> async dispatch=>{
    console.log('add website')
    try {
        const config ={
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        }
        const {title, language, framework, description, url, gitHubRepo}=fields
        const formData = new FormData()
        formData.append('file',file)
        formData.append('title',title)
        formData.append('language',language)
        formData.append('framework',framework)
        formData.append('description',description)
        formData.append('url',url)
        formData.append('gitHubRepo',gitHubRepo)
        const res = await axios.put(backend+'api/host/website', formData, config)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Website added','success'))
        history.push('/dashboard')
    } catch (error) {
        const errors = error.response.data.errors
        if(errors){
            errors.forEach(err => dispatch(setAlert(err.msg,'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}
export const deleteEducation = id => async dispatch=>{
    if(window.confirm('Are you sure?')){
        try {
            const res = await axios.delete(backend+`api/host/education/${id}`)
            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data
            })
            dispatch(setAlert('Education removed','success'))
        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: error.response.statusText, status: error.response.status}
            })
        }
    }
}
export const deleteWebsite = id => async dispatch=>{
    if(window.confirm('Are you sure?')){
        try {
            const res = await axios.delete(backend+`api/host/website/${id}`)
            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data
            })
            dispatch(setAlert('Website removed','success'))
        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: error.response.statusText, status: error.response.status}
            })
        }
    }
}
export const deleteExperience = id => async dispatch=>{
    if(window.confirm('Are you sure?')){
        try {
            const res = await axios.delete(backend+`api/host/experience/${id}`)
            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data
            })
            dispatch(setAlert('Experience removed','success'))
        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: error.response.statusText, status: error.response.status}
            })
        }
    }
}

export const deleteAccount = () => async dispatch =>{
    if(window.confirm('Are you sure? This cannot be undone!')){
        try {
            await axios.delete(backend+'api/host/account')
            dispatch({type: CLEAR_PROFILE})
            dispatch({type: ACCOUNT_DELETED})
            dispatch(setAlert('Account Deleted','success'))
        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: error.response.statusText, status: error.response.status}
            })
        }
    }
} 

