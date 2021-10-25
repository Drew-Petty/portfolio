import { combineReducers } from "redux";
import auth from './auth.reduce'
import alert from './alert.reduce'
import profile from './profile.reduce'

export default combineReducers({
    auth,
    alert,
    profile
})
