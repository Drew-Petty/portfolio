const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
    host:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'host'
    },
    location:{
        type:String
    },
    githubUsername:{
        type:String
    },
    linkedIn:{
        type:String
    },
    youtube:{
        type:String
    },
    technologies:{
        type:[String]
    },
    phone:{
        type:String
    },
    bio:{
        type:String
    },
    resume:{
        type:String
    },
    documents:[
        {
            title:{
                type:String,
            },
            googleDocLink:{
                type:String,
            }
        }
    ],
    websites:[
        {
            title:{
                type:String,
                required:true
            },
            language:{
                type:String
            },
            framework:{
                type:String
            },
            description:{
                type:String
            },
            demoLink:{
                type:String
            },
            url:{
                type:String
            },
            gitHubRepo:{
                type:String
            },
            filename:{
                type:String
            }
        }
    ],
    education:[
        {
            school:{
                type:String,
                required:true
            },
            degree:{
                type:String,
                required:true
            },
            fieldOfStudy:{
                type:String,
                required:true
            },
            from:{
                type:Date,
                required:true
            },
            to:{
                type:Date,
            },
            current:{
                type:Boolean,
                default: false
            },
            description:{
                type:String
            }
        }
    ],
    experience:[
        {
            title:{
                type:String,
                required:true
            },
            company:{
                type:String,
                required:true
            },
            location:{
                type:String
            },
            from:{
                type: Date,
                required:true
            },
            to:{
                type:Date
            },
            current:{
                type:Boolean,
                default: false
            },
            description:{
                type:String
            }
        }
    ]
},{timestamps:true})

module.exports = Profile = mongoose.model('profile', ProfileSchema)