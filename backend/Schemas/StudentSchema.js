const mongoose = require('mongoose');

//Student -> name,standard,division,parentContact,parentEmail

const StudentSchema = new mongoose.Schema({
    studentName : {
        type : String,
        require : true,
        message : 'School name is required'
    },
    standard : {
        type : String,
        require : true,
        message : 'Address is required'
    },
    division : {
        type : String,
        require : true,
        message : 'Year is required'
    },
    parentContact : {
        type : String,
        require : true,
        message : 'Medium is required'
    },
    parentEmail : {
        type : String,
        require : true,
        message : 'Staff count is require'
    }
})
module.exports = mongoose.model('Student', StudentSchema)