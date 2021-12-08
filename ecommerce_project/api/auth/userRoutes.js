const express = require('express');
const { joivalidate } = require('./joiValidation');
const jwt = require("jsonwebtoken");
const router = express.Router();
const userSignUp = require('./signupSchema');
const auth = require('../../middleware/userAuth')
const bcrypt = require('bcrypt')

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

// Our login logic starts here
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await userSignUp.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                {email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
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


router.post("/welcome",auth,(req,res)=>{
    res.json({message:"welcome user"})
})
module.exports = router;
