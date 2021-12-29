const router = require("express").Router();
const CryptoJS = require("crypto-js")
const User = require("../models/User")
const jwt = require("jsonwebtoken")
require("dotenv").config()
//register
router.post("/register",async (req,res)=>{
    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
             process.env.pass_sec
             ).toString()
    })
    
    try{
        const userEmail = await User.findOne({email:req.body.email})
        if(!userEmail){
            const saveUser= await newUser.save()
            res.status(200).json(saveUser)
            
        }else{
            res.status(400).json({message:"user is already exists"})
        }               
    }catch(err){
        res.status(500).json(err)
    }
    
})
//login
router.post("/login",async(req,res)=>{
    try{
        const user  = await User.findOne({username:req.body.username}) 
        if(!user){res.status(401).json("wrong credentials")}
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.pass_sec
            );
        const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8)
        if(Originalpassword !== req.body.password){
            res.status(401).json("wrong credentials")
        }
        const accessToken = jwt.sign({
            id:user._id,
            isAdmin: user.isAdmin,
        },
        process.env.jwt_sec,
        {expiresIn:'1d'})
        const{password, ...others} = user._doc;
        
         res.status(200).json({...others,accessToken})        
        
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports = router