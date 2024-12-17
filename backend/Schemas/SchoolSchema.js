const mongoose = require('mongoose');

//school -> name,address,year,medium,staffCount,board

const SchoolSchema = new mongoose.Schema({
    schoolName : {
        type : String,
        require : true,
        message : 'School name is required'
    },
    address : {
        type : String,
        require : true,
        message : 'Address is required'
    },
    year : {
        type : String,
        require : true,
        message : 'Year is required'
    },
    medium : {
        type : String,
        require : true,
        message : 'Medium is required'
    },
    staffCount : {
        type : String,
        require : true,
        message : 'Staff count is require'
    },
    board : {
        type : String,
        require : true,
        message : 'Board is required'
    }

    

})
module.exports = mongoose.model('School', SchoolSchema)