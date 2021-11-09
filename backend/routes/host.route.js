const HostController = require("../controllers/host.controller")
const express = require('express')
const router = express.Router()
const {check} = require('express-validator')
const auth = require('../middleware/auth')
const {upload} = require('../middleware/mult')

router.get('/', auth, HostController.getHostUser)

router.get('/host', HostController.getHost)

router.get('/profile', HostController.getProfile)

router.post('/register', [
    check('name','Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'please enter a password with 8 or more characters').isLength({min:8}),
    check('confirm','confirmation password must match password').custom((value, {req})=>value===req.body.password)
], HostController.registerHost)

router.post('/login', [
    check('email', 'please enter a valid email').isEmail(),
    check('password', 'please enter your password').exists()
], HostController.loginHost)

router.post('/profile', auth, HostController.profile)

router.delete('/account', auth, HostController.reset)

router.put('/website', [auth, upload,[
    check('title','Title is required').not().isEmpty(),
]], HostController.addWebsite)

router.delete('/website/:web_id', auth, HostController.removeWebsite)

router.put('/education', [auth,[
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldOfStudy', 'Field of Study is required').not().isEmpty(),
    check('from', 'From of Study is required').not().isEmpty()
]], HostController.addEducation)

router.delete('/education/:edu_id', auth, HostController.removeEducation)

router.put('/experience', [auth,[
    check('title', 'Title is required').not().isEmpty(),
    check('company', ' is required').not().isEmpty(),
    check('from', 'From is required').not().isEmpty()
]], HostController.addExperience)

router.delete('/experience/:exp_id', auth, HostController.removeExperience)

router.put('/document', [auth,[
    check('title', 'Title is required').not().isEmpty(),
    check('googleDocLink', 'URL is required').not().isEmpty()
]], HostController.addDocument)

router.delete('/document/:doc_id', auth, HostController.removeDocument)

router.get('/repos/:username', HostController.getRepos)

module.exports = router