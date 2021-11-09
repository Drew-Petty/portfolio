import axios from "axios";
import { setAlert } from "./alert.action";
import { EMAIL_FAILED, EMAIL_SENT } from "./actionTypes";

// const backend ="/backend/"
const backend ="http://localhost:3001/"

export const contactMe = (formData, history)=> async dispatch =>{
    try {
        console.log('contact me')
        const config ={
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post(backend+'api/email', formData, config)
        dispatch({
            type:EMAIL_SENT,
            payload:res.data
        })
        dispatch(setAlert('Email sent','success'))
        history.push('/')
    } catch (error) {
        dispatch({
            type: EMAIL_FAILED,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}