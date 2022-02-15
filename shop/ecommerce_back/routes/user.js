const router = require("express").Router();
const User = require("../models/User")
const CryptoJS = require("crypto-js")
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken")

const otpGenerator = require("otp-generator")
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const AccesToekn = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, AccesToekn);


// const SendOtp = require("sendotp")


//update user and user password
router.post("/updateUser", async (req,res)=>{
    // if(req.user.id=== req.params.id && req.user.isAdmin){
    // }
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password,process.env.jwt_sec).toString();

            try{
                const updateUser = await User.findByIdAndUpdate(req.body.id,{
                    $set :req.body
                })
                if(updateUser)res.status(200).send(updateUser)
                else res.status(400).send("Somthing went wrong user has been not updated")
                
            }catch(err){
                //console.log("error: ", err);
                res.status(400).json("Somthing went wrong user"+err)
            }
    }       
})

//delete

router.delete('/:id', verifyTokenAndAdmin, async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"user has been deleted"})
    }catch(err){
        res.status(400).json(err)
    }
})

//get user
router.get("/find/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
       const user = await User.findById(req.params.id)
        const {password, ...others} = user._doc;
        res.status(200).json(others)

    }catch(err){
        res.status(400).json(err)
    }
})


//get All user

router.get("/find", verifyTokenAndAdmin, async (req,res)=>{
    const query = req.query.new;
    try{
       const user = query ? await User.find().sort({_id:-1}).limit(5) : await User.find()
        
        res.status(200).json(user )

    }catch(err){
        res.status(400).json(err)
    }
})
//STATS
router.get("/stats",verifyTokenAndAdmin, async (req, res)=>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1));
    try{
        const data = await User.aggregate([
            {$match:{createdAt:{$gte:lastYear}}},
            {
                $project:{
                    month:{$month:"$createAt"}
                }
            },
            {
                $group:{
                    _id:"$month",
                    total:{$sum:1}
                }
            }
        ])
        res.status(200).json(data)
    }catch(err){
        res.status(400).json(err)
    }
})

//forget password
// generate otp

router.post('/forgetPassword/getOtp/:mobile',async (req,res)=>{    
    //find user by mobile
    const user = await User.findOne({mobile:req.params.mobile})    
    
    if(user){
        //generate otp
        const OTP = otpGenerator.generate(6,{
            digits:true,
             upperCaseAlphabets: false,
              specialChars:false,
               lowerCaseAlphabets:false
            });
        console.log("otp",OTP);

       //send otp to mobile
        client.messages
        .create({
           from: '+19205411896',
           to: '+91'+''+user.mobile,
           body: `Amount of INR 10000 is debit from your icici Bank account and OTP is ${OTP} and be aware from fraud call because because icici never ask otp from his account holder`
         })
        .then(message => console.log("otp send"))
        .catch(err=>console.log('err',err))
        
        //hashed otp before saved
        const hashOtp = CryptoJS.AES.encrypt(OTP, process.env.OTP_SECRETE_KEY).toString()
        console.log("hashedOtp", hashOtp)
        console.log('+91'+''+user.mobile)        

         //saved opt into database
         await User.updateOne({_id:user._id},{ $set : { otp:hashOtp } })
         .then(res=>console.log("otp hashed."))
         .catch(err=>console.log("error"+err));
        console.log('opt saved.')

        res.status(200).json({            
            otp:OTP,
            message:"otp generated.."
        })
    }
    else{
        res.status(400).json({
            message:"mobile number does not exist"
        })
    }
})

// verify otp and update password

router.post('/forgetPassword/verifyOtp/:mobile',async (req,res)=>{
    try{
        //find user by mobile
        const user = await User.findOne({mobile:req.params.mobile})
        if(user){
            //find otp from user
            console.log(user.otp);
            // decrypt saved otp
            const decryptOtp = CryptoJS.AES.decrypt(
                user.otp,
                process.env.OTP_SECRETE_KEY
                ).toString(CryptoJS.enc.Utf8)
            
            console.log('originalOtp', decryptOtp)
            //check    
            if(decryptOtp === req.body.otp){
                console.log(req.body.updatePassword)
                const encryptPass = req.body.updatePassword;
                //encrypt password 
                const updatePassword = CryptoJS.AES.encrypt(encryptPass, process.env.OTP_SECRETE_KEY).toString();
                //update password
                await User.updateOne({_id:user._id},{ $set : { password:updatePassword } })
                .then(res=>console.log('update successfulley'))
                .catch(err=>console.log('err'+err))
                res.status(200).json({
                    data:decryptOtp,                
                    message:"update successfully"
                })
            }else{
                res.status(400).json({
                    message:'Please enter correct otp'
                })
            }
            
        }
        else{
            res.status(400).json({
                message:"please check your mobile number"
            })
        }
      
    }catch(error){
        error && console.log("error"+error)
    }
})

module.exports = router 