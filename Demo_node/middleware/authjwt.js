const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')

const db = require('../model');

const {TokenExpiredError} = jwt

const checkError = (err, res)=>{
    if(err instanceof TokenExpiredError){
        return res.status(401).send({message:'UnAuthorized access token is expired.'})
    }
    return res.status(401).send({message:"unauthorized"})    
}

const verifyToken = (req,res,next)=>{
    let token = req.headers['x-access-token'];
    if(!token){
        return res.status(401).send({message:'token was not provided'})
    }
    jwt.verify(token, config.secret, (err, decode)=>{
        if(err){
            throw err;
        }
        req.userId = decode.id;
        next()
    })
}