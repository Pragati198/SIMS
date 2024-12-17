const mongoose = require('mongoose')

//name,phone,password

const AdminSchema = new mongoose.Schema({
    adminName : {
        type : String,
        require : true,
        message : 'Admin name is required'
    },
    phone : {
        type : Number,
        require : true,
        message : 'Phone number is required'
    },
    password : {
        type : String,
        require : true,
        message: 'Password is required'
    }
})
module.exports = mongoose.model('Admin', AdminSchema)