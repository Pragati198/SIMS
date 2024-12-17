const School = require('../Schemas/SchoolSchema')
const express = require('express')

const router = express.Router();

//school -> name,address,year,medium,staffCount,board

router.post('/', async(req,res)=>{
    try
    {
        const {schoolName,schoolAddress,schoolYear,schoolMedium,schoolStaffCount,schoolBoard} = req.body

        const newSchool = await School.create({
            schoolName,
            address : schoolAddress,
            year : schoolYear,
            medium : schoolMedium,
            staffCount : schoolStaffCount,
            board : schoolBoard
        })

         if(newSchool)
            {//Jsend format
                res.status(200).json({
                    status : 1,
                    message : 'School created successfully',
                    data : newSchool
                })
            }
            else{
                res.status(400).json({
                    status : 0,
                    message : 'Could not not add school. Please try again.',
                    data : null
                })
            }
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({
            status :0,
            message : 'Somethings went wrong. Please try again',
            data : null
        })
    }
})

router.get('/' , async(req,res)=>{
    try{
        const school = await School.find({});

        if(school)
        {
            res.status(200).json({
                status : 1,
                message : 'All School',
                data : school
            })
        }
        else{
            res.status(404).json({
                status : 0,
                message : 'No Products',
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

router.get('/:schoolId' ,async(req,res) => {
    try{
        let {schoolId} = req.params;
        const school = await School.findById(schoolId)

        if(school)
        {
            res.status(200).json({
                status : 1,
                message : 'School found',
                data : school
            })
        }
        else{
            res.status(404).json({
                status : 0,
                message : 'School not found',
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

router.put('/:schoolId' ,async(req,res)=>{
    try{
        const {schoolName,schoolAddress,schoolYear,schoolMedium,schoolStaffCount,schoolBoard} = req.body
        const updateSchool = await School.findByIdAndUpdate(req.params.schoolId, {
            schoolName,
            address : schoolAddress,
            year : schoolYear,
            medium : schoolMedium,
            staffCount : schoolStaffCount,
            board : schoolBoard
        })

        if(updateSchool)
        {
            res.status(200).json({
                status : 1,
                message : 'School updated successfully',
                data : updateSchool
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

router.delete('/:schoolId', async(req,res)=>{
    try{
        let {schoolId} = req.params
        const school = await School.findByIdAndDelete(schoolId);

        if(school)
        {
            res.status(200).json({
                status : 1,
                message : 'School deleted successfully',
                data : school
            })
        }
        else{
            res.status(404).json({
                status : 0,
                message : 'School not found',
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

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njg3OTczYjc3ZWM5NTAxOTg1MzU1MTYiLCJpYXQiOjE3MjAxNjI4NjB9.hPPYZDHcTFuW4zR-q2M1tMl9LL8xjMqYo4nqEZmDAn4

