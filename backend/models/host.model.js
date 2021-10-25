const mongoose = require('mongoose')

const HostSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    }
},{timestamps:true})

module.exports = Host = mongoose.model('host', HostSchema)