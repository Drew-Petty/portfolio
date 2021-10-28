import axios from 'axios'
import {REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGOUT} from './actionTypes'
import setAuthToken from '../utils/setAuthToken'
const backend ="/backend/"
// const backend ="http://localhost:3001/"


export const loadUser = () => async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get(backend+'api/host')
        dispatch({
            type:USER_LOADED,
            payload:res.data
        })

    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}
export const registerHost = (formData) => async dispatch =>{
    try {
        const config ={
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify(formData)
        const res = await axios.post(backend+'api/host/register',body,config)
        
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        })
        dispatch(loadUser())
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}
export const loginHost = (formData)=>async dispatch=>{
    try {
        const config ={
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify(formData)
        const res = await axios.post(backend+'api/host/login',body,config)
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        })
        dispatch(loadUser())
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

export const logout = ()=> async dispatch =>{
    dispatch({type: LOGOUT})
}