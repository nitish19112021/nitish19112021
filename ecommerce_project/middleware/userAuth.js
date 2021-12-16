const jwt = require('jsonwebtoken');
const verifytoken = (req,res,next) =>{
    const token = req.body.token || req.query.TOKEY_KEY || req.headers['x-access-token'];
    
    if(!token){
        return res.json({status:false,message:"token is required for login"})        
    }
    try{
        const decode = jwt.verify(token,process.env.TOKEN_KEY)
        req.userSignUp = decode
    }
    catch(err){
        return res.json({status:false, message:"invalid token"})
    }
    return next()
}

module.exports = verifytoken;