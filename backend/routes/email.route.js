const express = require('express')
const nodemailer = require('nodemailer')
const sgTransport = require('nodemailer-sendgrid-transport')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const config = require('config')
const Host = require("../models/host.model")



const transporter = nodemailer.createTransport(sgTransport({
    auth: {
        api_key: config.get('sendGrid')
    }
}))

router.post('/', [
    check('email', 'email is required').not().isEmpty(),
    check('subject', 'subject is required').not().isEmpty(),
    check('message', 'message is required').not().isEmpty(),
], async (req, res)=>{
    try {
        console.log('email route')
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const hosts = await Host.find().select('-password')
        const hostEmail = hosts[0].email
        console.log(hostEmail)
        const { email, subject, message}= req.body
        const mail = {
            to: hostEmail,
            from: email,
            subject: subject,
            html:`<p>${message}</p>`
        }
        res.json(mail)
        return transporter.sendMail(mail)
    } catch (error) {
        console.error(error)
        res.status(500).send('Server Error')
    }
})
module.exports = router