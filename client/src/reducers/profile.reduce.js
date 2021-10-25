import { PROFILE_LOADED, PROFILE_MISSING, PROFILE_ERROR, UPDATE_PROFILE, CLEAR_PROFILE, GET_REPOS } from "../actions/actionTypes"

const initialState={
    hostProfile:null,
    profileLoading:true,
    repos:[]
}

const reduceProfile = (state=initialState, action)=>{
    const{type, payload}=action
    switch(type){
        case PROFILE_LOADED:
        case UPDATE_PROFILE:
            return{
                ...state,
                hostProfile:payload,
                profileLoading:false
            }
        case PROFILE_MISSING:
            return{
                ...state,
                profileLoading:false
            }
        case CLEAR_PROFILE:
            return{
                ...state,
                hostProfile:null,
                profileLoading:false
            }
        case GET_REPOS:
            return{
                ...state,
                repos:payload,
                profileLoading:false
            }
        case PROFILE_ERROR:
        default:
            return state
    }
}

export default reduceProfile
