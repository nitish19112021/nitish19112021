const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')

router.post('/userRegister',(req, res, next)=>{
    const userDetails = req.body;
    try{
        userController.register(userDetails)
        .then(result=>{
            return res.status(200).send(result)
        }).catch(err=>{
            if(err){
                console.log("route error",err)
                return res.send(err)

            }   
        })
    }catch(err){
        return next(err)
    }
})

router.post('/userLogin',(req,res)=>{
    const userDetails = req.body;
    try{
        userController.login(userDetails)
        .then(result =>{
            return res.status(200).send(result)
        }).catch(err=>{
            if(err){
                console.log("login error",err)
            }
        })
    }catch(err){
        if(err){
            console.log('login Err', err)
            return res.send(err)
        }
    }
})

module.exports = router