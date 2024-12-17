const mongoose = require('mongoose');

//Teacher -> name,qualification,gender,email,contact,age,standard,salary

const teacherSchema = new mongoose.Schema({
    teacherName : {
        type : String,
        require : true,
        message : 'Teacher name is required'
    },
    qualification : {
        type : String,
        require : true,
        message : 'Qualification is required'
    },
    gender : {
        type : String,
        require : true,
        message : 'Gender is required'
    },
    email : {
        type : String,
        require : true,
        message : 'Email is required'
    },
    contact : {
        type : Number,
        require : true,
        message : 'Contact is required'
    },
    age : {
        type : Number,
        require : true,
        message : 'Age is required'
    },
    standard : {
        type : String,
        require : true,
        message : 'Standard is required'
    },
    salary : {
        type : Number,
        require : true,
        message : 'Salary is reuired'
    },
    teacherImg :{
        type : String,
        require : true,
        message : 'Image is required'
    }
})

module.exports = mongoose.model('Teacher',teacherSchema);