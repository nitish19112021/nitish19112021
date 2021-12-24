const router = require("express").Router();
const User = require("../models/User")
const CryptoJS = require("crypto-js")
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken")

//update user and user password
router.put("/:id",verifyTokenAndAuthorization, async (req,res)=>{
    // if(req.user.id=== req.params.id && req.user.isAdmin){
    // }
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.jwt_sec).toString()
    }    
    try{
        const updateUser = await User.findByIdAndUpdate(req.params.id,{
            $set :req.body
        },{new:true})
        res.status(200).json(updateUser)
    }catch(err){
        res.status(400).json("erro"+err)
    }
})

//delete

router.delete('/:id', verifyTokenAndAuthorization, async (req,res)=>{
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

module.exports = router 