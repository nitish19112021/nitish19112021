const express = require("express");
const router = express.Router();
const userController = require("./user.controller")



//signup user
router.post("/registerUser",(req,res,next)=>{
    const userDetails = req.body
    try {
        userController.userRegister(userDetails).then((result) => {
            return res.status(200).json({result})
        }, err => {
            // console.log(err)
            res.json(err)
            // return next(err)
        }
        )
    }
    catch (err) {
        return next(err)
    }
})

router.post("/login", (req,res, next)=>{
    const userDetails = req.body;
    try{
        userController.loginUser(userDetails).then(result =>{
            return res.status(200).json({result})
        },err=>{
            return res.json(err)
            // return next(err)
        })
    }catch(err){
        return next(err)
    }
})

module.exports = router
