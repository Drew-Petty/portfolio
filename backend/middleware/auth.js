const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function(req, res, next){
    //Get token from header
    const token = req.header('x-auth-token')

    //check if no token
    if(!token){
        console.log('no token')
        return res.status(401).json({msg: 'No token, authorization denied'})
    }
    //verify token
    try{
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.hostUser = decoded.host

        next()
    }catch(err){
        console.log(err)
        console.error(err)
        res.status(401).json({msg: 'token is not valid'})
    }
}