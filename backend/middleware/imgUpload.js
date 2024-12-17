const multer = require('multer')
const path = require('path')

const imageStorageSetting = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null, path.join(__dirname, '../' , 'uploads'));
    },
    filename : (req,file,cb)=>{
        const timestamp = Date.now();
        const fileExtension = path.extname(file.originalname)
        const finalFileName = `${timestamp} ${fileExtension}`
        file.originalname = finalFileName;
        cb(null, finalFileName)
    }
})

const imgUploadMw = multer({
    storage : imageStorageSetting,
    fileFilter : (req,file,cb)=>{
        const allowedExtension = ['.jpg', '.png', '.jpeg','.gif','.webp','.pdf'];
        const fileExtension = path.extname(file.originalname.toLowerCase())
        if(allowedExtension.includes(fileExtension))
        {
            cb(null,true)
        }
        else{
            cb(new Error('Invaild file extension'), false)
        }
    } 
})

module.exports = imgUploadMw