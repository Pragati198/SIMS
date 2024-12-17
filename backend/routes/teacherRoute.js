const Teacher = require('../Schemas/TeacherSchema')
const express = require('express')
const router = express.Router();
const imgUpload = require('../middleware/imgUpload')

//Teacher -> name,qualification,gender,email,contact,age,standard,salary

router.post('/',imgUpload.single('teacherImg') ,async(req,res)=>{
    try
    {
        const {name,qualification,gender,email,contact,age,standard,salary} = req.body

        const newTeacher = await Teacher.create({
            teacherName:name,
            qualification,
            gender,
            email,
            contact,
            age,
            standard,
            salary,
            teacherImg : req.file.originalname
        })

        if(newTeacher)
        {
            res.status(200).json({
                status : 1,
                message : 'Teacher created successfully',
                data : newTeacher
            })
        }
        else{
            res.status(404).json({
                status : 0,
                message : 'Could not add teacher, Please try again.',
                data : []

            })
        }
    }
    catch(err){
        res.status(500).json({
            status : 0,
            message : 'Something went wrong. Please try again',
            data : null
        })
    }
})

router.get('/', async(req,res)=>{
    try{
        const teacher = await Teacher.find({});

        if(teacher)
        {
            res.status(200).json({
                status : 1,
                message : 'All teacher retrieved successfully',
                data : teacher
            })
        }
        else{
            res.status(404).json({
                status : 0,
                message : 'No Teacher found.',
                data : []
            })
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status : 0,
            message : 'Something went wrong, Please try again',
            data : null
        })
    }
})

router.put('/:teacherID', async(req,res)=>{
    try{
        const {name,qualification,gender,email,contact,age,standard,salary} = req.body
        const updateTeacher = await Teacher.findByIdAndUpdate(req.params.teacherID, {
            teacherName:name,
            qualification,
            gender,
            email,
            contact,
            age,
            standard,
            salary,
            // teacherImg : req.file.originalname
        })

        if(updateTeacher)
        {
            res.status(200).json({
                status : 1,
                message : 'Teacher updated successfully',
                data : updateTeacher
            })
        }
        else{
            res.status(404).json({
                status : 0,
                message : 'Please try again',
                data : []
            })
        }
    }
    catch(err){
        console.log(err);
        
        res.status(500).json({
            status : 0,
            message : 'Something went wrong, Please try again',
            data : null
        })
    }
    
})

router.delete('/:teacherID', async(req,res)=>{
    try{
        let {teacherID} = req.params
        const teacher = await Teacher.findByIdAndDelete(teacherID);

        if(teacher)
        {
            res.status(200).json({
                status : 1,
                message : 'Teacher deleted successfully',
                data : teacher
            })
        }
        else{
            res.status(404).json({
                status : 0,
                message : 'Teacher not found',
                data : []
            })
        }
    }
    catch(err){
        res.status(500).json({
            status : 0,
            message : 'Something went wrong, Please try again',
            data : null
        })
    }
})



module.exports = router