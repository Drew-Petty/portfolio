const Host = require("../models/host.model")
const Profile = require("../models/profile.model")
const { validationResult } = require('express-validator')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const request = require('request')
const fs = require('fs')
const UploadPath = './public/uploads/'

class HostController{
    getHostUser = async (req, res) =>{
        try {
            const host = await Host.findById(req.hostUser.id).select('-password')
            res.json(host)
        } catch (error) {
            console.error(error)
            res.status(500).send('Server Error')
        }
    }
    getHost= async (req, res)=>{
        try {
            const hosts = await Host.find().select('-password')
            res.json(hosts[0])
        } catch (error) {
            console.error(error)
            res.status(500).send('Server Error')
        }
    }
    getProfile = async (req, res)=>{
        try {
            const profiles = await Profile.find().populate('host',['name','email', 'avatar'])
            res.json(profiles[0])
        } catch (error) {
            console.error(error)
            res.status(500).send('Server Error')
        }
    }
    registerHost = async (req, res)=>{
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({errors:errors.array()})
            }
            const { name, email, password } = req.body
            let host = await Host.findOne({email})
            if(host){
                return res.status(400).json({errors:[{msg: 'User already exists'}]})
            }
            const avatar = gravatar.url(email,{
                size:'200',
                rating:'pg',
                default:'mm',
            })
            const salt = await bcrypt.genSalt(10)
            host = new Host({
                name,
                email,
                password,
                avatar
            })
            host.password = await bcrypt.hash(password,salt)
            await host.save()
            const profile = new Profile({
                host:host.id
            })
            await profile.save()
            const payload = {
                host:{
                    id:host.id
                }
            }
            jwt.sign(payload,config.get('jwtSecret'),{expiresIn:60*60},(err,token)=>{
                if(err)throw error
                res.json({ token })
            })
        } catch (error) {
            console.error(error)
            res.status(500).send('Server Error')
        }
    }
    loginHost = async (req, res)=>{
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({errors:errors.array()})
            }
            const { email, password} = req.body
            let host = await Host.findOne({email})
            if(!host){
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }]})
            }
            const isMatch = await bcrypt.compare(password, host.password)
            if(!isMatch){
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }]})
            }
            const payload = {
                host: {
                    id: host.id
                }
            }
            jwt.sign(payload,config.get('jwtSecret'),{expiresIn:60*60},(err,token)=>{
                if(err)throw error
                res.json({ token })
            })
        } catch (error) {
            console.error(error)
            res.status(500).send('Server Error')
        }
    }
    profile = async (req, res)=>{
        try {
            const { location, githubUsername, linkedIn, technologies, phone, bio, resume, youtube }=req.body
            const profileFields={}
            profileFields.host = req.hostUser.id
            profileFields.location = location
            profileFields.phone = phone
            profileFields.githubUsername = githubUsername
            profileFields.bio = bio
            profileFields.resume = resume
            profileFields.linkedIn = linkedIn
            profileFields.youtube = youtube
            if(technologies === ''){
                profileFields.technologies = []
            }else{
                profileFields.technologies = technologies.split(',').map(tech=>tech.trim())
            }
            
            let profile = await Profile.findOne({host: req.hostUser.id}) 
            if(profile){
                profile = await Profile.findOneAndUpdate({host: req.hostUser.id},{$set:profileFields},{new:true})
                return res.json(profile)
            }
            profile = new Profile(profileFields)
            await profile.save()
            res.json(profile)
        } catch (error) {
            console.error(error)
            res.status(500).send('Server Error')
        }
    }
    reset = async (req, res)=>{
        try {
            console.log(req.hostUser.id)
            const profiles = await Profile.find()
            console.log(profiles)
            const profile = await Profile.findOne({host:req.hostUser.id})
            console.log(profile)
            if(profile){
                for(let website of profile.websites){
                    fs.unlinkSync(UploadPath+website.filename)
                }
            }
            await Profile.findOneAndRemove({host:req.hostUser.id})
            await Host.findOneAndRemove({_id:req.hostUser.id})
            res.json({msg:'Host deleted'})
        } catch (error) {
            console.error(error)
            res.status(500).send('Server Error')
        }
    }
    addWebsite = async (req, res)=>{
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array()})
            }
            const { title, language, framework, description, url, demoLink, gitHubRepo }= req.body
            const { filename }= req.file
            const newWeb = { title, language, framework, description,url,gitHubRepo, demoLink, filename}
            const profile = await Profile.findOne({host: req.hostUser.id})
            profile.websites.unshift(newWeb)
            await profile.save()
            res.json(profile)
        } catch (error) {
            console.error(error)
            res.status(500).send('Server Error')
        }
    }
    removeWebsite = async (req, res)=>{
        try {
            const profile = await Profile.findOne({host:req.hostUser.id})
            const removeIndex = profile.websites.map(item=>item.id).indexOf(req.params.web_id)
            const website = profile.websites.splice(removeIndex,1)
            if(fs.existsSync(UploadPath+website[0].filename)){
                fs.unlinkSync(UploadPath+website[0].filename)
            }
            await profile.save()
            res.json(profile)
        } catch (error) {
            console.error(error)
            res.status(500).send('Server Error')
        }
    }
    addEducation = async (req, res)=>{
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array()})
            }
            const { school, degree, fieldOfStudy, from, to, current, description }= req.body
            const newEdu = {school, degree, fieldOfStudy, from, to, current, description}
            const profile = await Profile.findOne({host: req.hostUser.id})
            profile.education.unshift(newEdu)
            await profile.save()
            res.json(profile)
        } catch (error) {
            console.error(error)
            res.status(500).send('Server Error')
        }
    }
    removeEducation= async (req, res)=>{
        try {
            const profile = await Profile.findOne({host:req.hostUser.id})
            const removeIndex = profile.education.map(item=>item.id).indexOf(req.params.edu_id)
            profile.education.splice(removeIndex,1)
            await profile.save()
            res.json(profile)
        } catch (error) {
            console.error(error)
            res.status(500).send('Server Error')
        }
    }
    addExperience = async (req, res)=>{
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array()})
            }
            const { title, company, location, from, to, current, description }= req.body
            const newExp = {title, company, location, from, to, current, description}
            const profile = await Profile.findOne({host: req.hostUser.id})
            profile.experience.unshift(newExp)
            await profile.save()
            res.json(profile)
        } catch (error) {
            console.error(error)
            res.status(500).send('Server Error')
        }
    }
    removeExperience = async (req, res)=>{
        try {
            const profile = await Profile.findOne({host:req.hostUser.id})
            const removeIndex = profile.experience.map(item=>item.id).indexOf(req.params.exp_id)
            profile.experience.splice(removeIndex,1)
            await profile.save()
            res.json(profile)
        } catch (error) {
            console.error(error)
            res.status(500).send('Server Error')
        }
    }
    addDocument = async (req, res)=>{
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array()})
            }
            const {title, googleDocLink} = req.body
            const newDoc = {title, googleDocLink}
            const profile = await Profile.findOne({host: req.hostUser.id})
            profile.documents.unshift(newDoc)
            await profile.save()
            res.json(profile)
        } catch (error) {
            console.error(error)
            res.status(500).send('Server Error')
        }
    }

    removeDocument = async (req, res)=>{
        try {
            const profile = await Profile.findOne({host:req.hostUser.id})
            const removeIndex = profile.documents.map(item=>item.id).indexOf(req.params.doc_id)
            profile.documents.splice(removeIndex,1)
            await profile.save()
            res.json(profile)
        } catch (error) {
            console.error(error)
            res.status(500).send('Server Error')
        }
    }

    getRepos = async (req, res)=>{
        try {
            const options ={
                // uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
                uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`,
                method:'GET',
                headers:{'user-agent':'node.js'}
            }
            request(options, (err, response, body)=>{
                if(err)console.log(err)
                console.log(body)
                if(response.statusCode !== 200){
                    return res.status(404).json({msg: 'No Github profile found'})
                }

                res.json(JSON.parse(body))
            })
        } catch (error) {
            console.error(error)
            res.status(500).send('Server Error')
        }
    }
}

module.exports = new HostController()