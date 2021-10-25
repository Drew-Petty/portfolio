import {USER_LOADED, LOGOUT, LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS, AUTH_ERROR, ACCOUNT_DELETED} from '../actions/actionTypes'

const initialState={
    token: localStorage.getItem('token'),
    isAuthenticated:null,
    authLoading:true,
    host:null
}

const reduceAuth = (state=initialState, action)=>{
    const {type, payload}=action
    switch(type){
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                authLoading:false,
                host:payload
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token)
            return{
                ...state,
                ...payload,
                isAuthenticated:true,
                authLoading:false
            }
        case LOGOUT:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case ACCOUNT_DELETED:
        case AUTH_ERROR:
            localStorage.removeItem('token')
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                authLoading:false
            }
        default:
            return state
    }
}

export default reduceAuth