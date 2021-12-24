const User = require("./user.model")
const bcrypt = require("bcrypt")

module.exports = {
    userRegister:(userDetails)=>{
        return new Promise((resolve,reject)=>{
            if(userDetails && userDetails.userEmail){
                User.find({userEmail:userDetails.userEmail},(err, data)=>{
                    if(err){
                        return reject({status:400, message:"error occured"})
                    }
                    else{
                        if(data.length > 0){
                            return reject({status:200, message:"user is already exists"})
                        }
                        else{
                            const user = new User({
                                userName:userDetails.userName,
                                userPassword: userDetails.userPassword,
                                userEmail:userDetails.userEmail,
                                userPhone:userDetails.userPhone,
                            })
                            user.save().then(data=>{
                                console.log(data)
                                resolve({ status: true, data:data, message: "Register Successfully" })
                            }).catch(err=>{
                                return reject({status:400,err, message:"Not register"})
                            })
                        }
                    }

                })
            }
            else{
                return reject({status:400, message:"error"})
            }
        })
    },
    loginUser :  (userDetails)=>{        
        return new Promise((resolve,reject)=>{
            if(userDetails && userDetails.userEmail){
                User.findOne({"userEmail":userDetails.userEmail},async (err,data)=>{
                    if(err){
                        return reject("err"+err)
                    }
                    if(data && await (bcrypt.compare(userDetails.userPassword, data.userPassword))){
                          return resolve("welcome user")  
                    }
                    else{
                        return reject({status:400,message:'Please check you Email and password'})
                    }
                })
            }else{
                return reject("error")
            }
        })
    },
    
}