const express = require('express');
const { joivalidate } = require('./joiValidation');
const jwt = require("jsonwebtoken");
const router = express.Router();
const userSignUp = require('./signupSchema');
const auth = require('../../middleware/userAuth')
const bcrypt = require('bcrypt')
// const sendEmail = require("../../utility/sendEmail");
const nodemailer = require('nodemailer');
require('dotenv').config()


//user signUp
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

    // create token    
    // const token = jwt.sign({email:req.body.email},
    //     process.env.TOKEN_KEY,
    //     {expiresIn:"2h"});
    //     userSignUp.token = token;

    userSignUp.findOne({email:req.body.email},(err,existingUser)=>{
        if(err){res.status(400).json({message:err})}
        if(existingUser){
            res.json({message:"user is already exists"})
        }else{
            usersdataSignup.save((error,data)=>{
                if(error) throw error;
                res.status(200).json({data,message:"data inserted.. "})
            })
        }
    })   
})

//login user
router.post('/login',async (req,res)=>{  
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        const user = await userSignUp.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                {email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "1h",
                }
            );

            // save user token
            user.token = token;
            // user
            res.status(200).json({user,token:token, message:"login successfully"});
        }
        res.status(400).json({message:"invalid credentials"});
    } catch (err) {
        console.log(err);
    }  
})

//use middleware to login
router.post("/welcome",auth,(req,res)=>{
    res.json({message:"welcome user"})
})

//change password
router.post('/changePassword',async (req,res)=>{
    // get user input
    const{email,password,newPassword} = req.body;
    //validate user from database
     await userSignUp.findOne({ email:email}).then(user=>{
         //compare the current password with dcrypt password
        bcrypt.compare(password,user.password,(err, ismatch)=>{
            if(err) throw err;
            if(ismatch){
                //generate salt for new password
                bcrypt.genSalt(10,(err,salt)=>{
                    //bcrypt the password
                    bcrypt.hash(newPassword,salt,(err,hash)=>{
                        if(err) throw err;
                        user.password = hash;
                        user.save();
                        res.json({message:"password change successfully"})
                    })
                                          
                })
            }
            else{
                res.json({message:"You already change your password"})
            }
        })
    });
    
})

//Forget password
router.post('/forgetPassword',async (req,res)=>{
    const {email, password} = req.body;
    const user = await userSignUp.findOne({email:email})
    if(!user){res.status(400).json({message:"not a valid user"})}
    else{
        //create token    
        const token = jwt.sign({email:req.body.email},
            process.env.TOKEN_KEY,
            {expiresIn:"10m"});
            userSignUp.token = token;
            res.json({token,message:"token created"})

            const transporter = nodemailer.createTransport({
                host:'smtp.gmail.com',
                secure:false,
                requireTLS:true,                
                auth:{
                    user:"nitishchauhan19999@gmail.com",
                    pass:"NChauhan@1992"
                }
            })
            const link = `http://localhost:3000/api/updatePassword/${user.email}/${token}`
            console.log(link)
            const maildata = {
                from:'nitishchauhan19999@gmail.com',
                to:'nitishchauhan19999@gmail.com',
                subject:"account activation",
                text:link
            }
            transporter.sendMail(maildata,(err,info)=>{
                if(err) {
                    console.log("mail not send")
                }
                else{
                    console.log("mail send")
                }
            })
    }
       
})

router.get('/updatePassword/:email/:token',async (req,res)=>{
    const {email,token} = req.params;
    // res.send(req.params)
     const user = await userSignUp.findOne({email:email})
     if(!user){
         res.send("not a valid email")
     }
    else{
            res.status(200).json({message:"user is valid", token: token})
        }
})
//////////////////////////////////check 
router.post("/resetPassord/:email/:token", async (req,res)=>{
    const {email, token} = req.params;
        
    const user = await userSignUp.findOne({email:email},(err,result)=>{
        if(err){res.send("not found")}
        const password = req.body.password;
        bcrypt.genSalt(10,(err,salt)=>{
            //bcrypt the password
            bcrypt.hash(password,salt,(err,hash)=>{
                if(err) throw err;
                user.password = hash;
                user.save();
                
                res.json({message:"password change successfully"})
            })
                              
        })

    })

})


module.exports = router;
