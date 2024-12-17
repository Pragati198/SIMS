const Student = require('../Schemas/StudentSchema')
const express = require('express')
const router = express.Router();

//Student -> name,standard,division,parentContact,parentEmail

router.post('/', async(req,res)=>{
    try
    {
        const {studentName,standard,division,parentContact,parentEmail} = req.body
        
        const newStudent = await Student.create({
            studentName,
            standard,
            division,
            parentContact,
            parentEmail
        })

        if(newStudent)
        {
            res.status(200).json({
                status : 1,
                message : 'Student created successfully',
                data : newStudent
            })
        }
        else{
            res.status(404).json({
                status : 0,
                message : 'Could not add student, Please try again.',
                data : []
            })
        }
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status : 0,
            message : 'Something went wrong. Please try again',
            data : null
        })
    }
})

router.get('/', async(req,res)=>{
    try{
        const student = await Student.find({});


        if(student)
        {
            res.status(200).json({
                status : 1,
                message : 'All student retrived successfully.',
                data : student
            })
        }
        else
        {
            res.status(404).json({
                status : 0,
                message : 'No student found',
                data : []
            })
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status : 0,
            message : 'Something went wrong,Please try again.',
            data : null
        })
    }
})

router.get('/:studentId' , async(req,res)=>{
    try{
        let{studentId} = req.params;
        const student = await Student.findById(studentId)

        if(student)
        {
            res.status(200).json({
                status : 1,
                message : 'All student found',
                data : student
            })
        }
        else{
            res.status(404).json({
                status : 0,
                message : 'Student not found',
                data : []
            })
        }
    }
    catch(err)
    {
        res.status(500).json({
            status : 0,
            message : 'Something went wrong, Please try again.',
            data : null
        })
    }
})

router.put('/:studentId', async(req,res)=>{
    try{
        const{name,student,division,parentContact,parentEmail} = req.body

        const updateStudent = await Student.findByIdAndUpdate(req.params.studentId, {
            name,
            student,
            division,
            parentContact,
            parentEmail
        })

        if(updateStudent)
        {
            res.status(200).json({
                status : 1,
                message : 'Student update successfully',
                data : updateStudent
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
        res.status(500).json({
            status : 0,
            message : 'Something went wrong. Please try again'
        })
    }
})

router.delete('/:studentId', async(req,res)=>{
    try{
        let {studentId} = req.params;
        const student = await Student.findByIdAndDelete(studentId)

        if(student)
        {
            res.status(200).json({
                status : 1,
                message : 'student deleted successfully',
                data : student
            })
        }
        else{
            res.status(404).json({
                status : 0,
                message : 'Student not found',
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

module.exports=router