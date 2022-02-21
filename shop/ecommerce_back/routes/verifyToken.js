const jwt = require("jsonwebtoken");
const ErrCode = require("../statusCode")
const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.token;
    console.log(authHeader)
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.jwt_sec,(err,user)=>{
            if(err) return res.json({status:ErrCode.statusCode["Bad Request"], message:"token is not verified"})
            req.user = user;
            console.log("authheader",req.user)
            next()
        })
    }else{
        return res.status(400).json("token is not valid")

    }
}

const verifyTokenAndAuthorization = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.body.id || req.user.isAdmin){
            next();
        }
        else{
            res.json("you are not authorised")
        }
    })
}

const verifyTokenAndAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next()
        }
        else{
            res.status(400).json("you are not allowed to do that")
        }
    })
}
module.exports = {verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin}