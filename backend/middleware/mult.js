const multer = require('multer')
const path =require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./public/uploads')
    },
    filename: function(req, file, cb){
        cb(null, Date.now()+'-'+file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits:{fileSize: 1500000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb)
    }}).single('file')

const checkFileType= (file, cb) =>{
    const fileTypes = /jpeg|jpg|png|gif/
    const extName = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase())
    const mimeType = fileTypes.test(file.mimetype)
    if(extName && mimeType){
        return cb(null,true)
    }else{
        cb('Error: Images Only')
    }
}
module.exports = {upload};

