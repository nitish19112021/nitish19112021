const express = require('express');
const { joivalidate } = require('./joiValidation');
const jwt = require("jsonwebtoken");
const router = express.Router();
const userSignUp = require('./signupSchema');
router.post('/addUser',(req,res)=>{
    //joi validation
    const { error } = joivalidate.validate(req.body)
    if(error) return res.json(error.details[0].message)
    const usersdataSignup = new userSignUp({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        mobile:req.body.mobile
    });
         
     
    userSignUp.findOne({email:req.body.email},(err,existingUser)=>{
        if(err){res.status(400).json({message:err})}
        if(existingUser){
            res.json({message:"user is already exists"})
        }else{
            usersdataSignup.save((error,data)=>{
                if(error) throw error;
                res.status(200).json({data, message:"data inserted.. "})
            })
        }
    })   
})

router.post('/login',(req,res)=>{    
    // const user ={
    //     email: req.body.email,
    //     password:req.body.password
    // }
    // jwt.sign({user:user},'secretkey',(err,token)=>{
    //     res.json({token:token})
    // })
    const email = req.body.email;
    const validateEmail= function (email) {
        return String(email).match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
    }
    if(!validateEmail(email)){
        res.json({message:"Please enter valid email"})
    }
    else{
        userSignUp.findOne({email:email},(err,user)=>{

            if(err) res.json({message:err})
            if(!user){
                res.json({message:"not found"})
            }
            res.status(200).json({message:"login successfully"})
        })    
    }
})


module.exports = router;
