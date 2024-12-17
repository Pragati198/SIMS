const mongoose = require('mongoose')

//NonTeaching -> name, gender, age, contact, designation

const NonTechSchema = new mongoose.Schema({
    nonTechName : {
        type : String,
        required : true,
        message : 'Non Teaching name is required.'
    },
    gender : {
        type : String,
        required : true,
        message : 'Non Teaching gender is required.'
    },
    age : {
        type : Number,
        required : true,
        message : 'Non Teaching age is required.'
    },
    contact : {
        type : Number,
        required : true,
        message : 'Non Teaching contact is required.'
    },
    designation : {
        type : String,
        required : true,
        message : 'Non Teaching designation is required.'
    }
})

module.exports = mongoose.model('NonTeaching', NonTechSchema)