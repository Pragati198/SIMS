const NonTeaching = require('../Schemas/NonTeachingSchema')
const express = require('express'); 
const { route } = require('./nonTechingRoute');

const router = express.Router();

router.post('/', async(req,res)=>{
    try
    {
        const {nonTechName, gender, age, contact, designation} = req.body;

        const newNonTech = await NonTeaching.create({
            nonTechName,
            gender,
            age,
            contact,
            designation
        })

        if(newNonTech)
        {
            res.status(200).json({
                status : 1,
                message : 'Non Teaching created successfully.',
                data : newNonTech
            })
        }
        else{
            res.status(400).json({
                status : 0,
                message : 'Could not not add teacher. Please try again.',
                data : null
            })
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status :0,
            message : 'Somethings went wrong. Please try again',
            data : null
        })
    }
})

router.get('/', async(req,res)=>{
    try{
        const nonTech = await NonTeaching.find({});

        if(nonTech)
        {
            res.status(200).json({
                status : 1,
                message : 'All Non Teaching',
                data : nonTech
            })
        }
        else{
            res.status(404).json({
                status : 0,
                message : 'Non Teaching not found.',
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

router.put('/:nontechID', async(req,res)=>{
    try{
        const {nonTechName, gender, age, contact, designation} = req.body;

        const updateNonTech = await NonTeaching.findByIdAndUpdate(req.params.nontechID, {
            nonTechName,
            gender,
            age,
            contact,
            designation
        })

        if(updateNonTech)
        {
            res.status(200).json({
                status : 1,
                message : 'Non Teaching updated successfully',
                data : updateNonTech
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

router.delete('/:nontechID', async(req,res)=>{
    try{
        let {nontechID} = req.params
        const nonTech = await NonTeaching.findByIdAndDelete(nontechID);

        if(nonTech)
        {
            res.status(200).json({
                status : 1,
                message : 'Non teaching deleted successfully',
                data : nonTech
            })
        }
        else{
            res.status(404).json({
                status : 0,
                message : 'Non Teaching not found',
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