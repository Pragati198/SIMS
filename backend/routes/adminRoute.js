const Admin = require('../Schemas/AdminSchema')
const express = require('express')
const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router();

//register : /api/v1/admin/register
//login : /api/v1/admin/login
//name,phone,password
router.post('/register' ,async(req,res)=>{
    try
    {
        const {adminName,phone,password} = req.body;
        const checkPhonePresent = await Admin.findOne({phone});

        if(checkPhonePresent)
        {
            res.status(400).json({
                status : 0,
                message : 'Phone already present',
                data : null
            })
            return
        }
        else{
            try{
                const salt = await bcrypt.genSalt(10); //sadfghh
                const hashedPwd = await bcrypt.hash(password,salt);//asdfsdjgklfgjfd
                const newAdmin = await Admin.create({
                adminName,
                phone,
                password : hashedPwd
            })
            if(newAdmin)
            {
                res.status(200).json({
                    status:1,
                    message :'Admin created successfully',
                    data : newAdmin
                })
            }
            else{
                res.status(400).json({
                    status:0,
                    message:'Admin creation failed. Please try again.',
                    data : []
                })
            }
            }
            catch(err){
                console.log(err);
                res.status(500).json({
                    status : 0,
                    message : 'Something went wrong.',
                    data : null
                })
            }
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status : 0,
            message : 'Something went wrong.',
            data : null
        })
    }
})

router.post('/login', async(req,res)=>{
    try{
        const {adminName,phone,password} = req.body;
        const adminDoc = await Admin.findOne({phone});

        if(adminDoc)
        {
            const hashedPwd = adminDoc.password;
            const passwordStatus = await bcrypt.compare(password,hashedPwd);

            if(passwordStatus)
            {
                jsonwebtoken.sign({_id : adminDoc._id},
                    process.env.JWT_SECRET_KEY,(err,token)=>{
                        if(err){
                            res.status(500).json({
                                status:0,
                                message : 'Somthing went wrong. please try  again.'
                            })
                        }
                        else{
                            res.status(200).json({
                                status : 1,
                                message : 'Login successful.',
                                token
                            })
                        }
                })
                    
            }
            else{
                res.status(400).json({
                    status : 0,
                    message : 'Password Incorrect'
                })
            }
        }
        else{
            res.status(400).json({
                status : 0,
                message : 'Phone number is Incorrect'
            })
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status : 0,
            message : 'Something went wrong, Please try again'
        })
    }
})

module.exports = router;