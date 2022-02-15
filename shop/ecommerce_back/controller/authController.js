const CryptoJS = require("crypto-js")
const User = require("../models/User")
 const jwt = require("jsonwebtoken")
//const jwt = require('jwt-simple')

exports.register = async (req,res)=>{
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;
    if(password === confirmpassword){
        const newUser = new User({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            username:req.body.username,
            email:req.body.email,
            mobile:req.body.mobile,
            otp:'',
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
}else{
    res.status(200).json({message:'Password and Confirm password should be same.'})
}
}

exports.login = async (req,res)=>{
    console.log('login')
    try{        
        const user  = await User.findOne({username:req.body.username}) 
        console.log("nit", user);
        
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
    {expiresIn:'1m'})
    const token = await User({
        token:accessToken
    })
    token.save()
    .then(res=>console.log('token saved',res))
    .catch(err=>console.log("err"+err))
    console.log(accessToken)
    const{password, ...others} = user._doc;
    
     res.status(200).json({...others,accessToken})        
    
}catch(err){
    res.status(500).json(err)
}
}