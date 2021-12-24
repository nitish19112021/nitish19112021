const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next)=>{

    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.jwt_sec,(err,user)=>{
            if(err) res.status(400).json("token is not verified.")
            req.user = user
            console.log(req.user)
            next()
        })
    }else{
        return res.status(400).json("you are not authorized")

    }
}

const verifyTokenAndAuthorization = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id ===req.params.id || req.user.isAdmin){
            next()
        }
        else{
            res.status(400).json("you are not allowed to do that")
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