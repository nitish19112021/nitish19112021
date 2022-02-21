// const userModel = require('../model/user')
const db = require('../config/database');
const userModel = db.users;
module.exports = {
    register:async (req,res)=>{
        try{
            const emailExists = await userModel.findOne({ where: { email: req.body.email } });            
            if (emailExists ) {
              res.json("Email already registered")
            }else{
                
            const user = {
                username:req.body.username,
                password:req.body.password,
                email:req.body.email,
            }
            userModel.create(user)
            .then((user)=>{                
                res.send(user)
            }).catch((err)=>{
                if(err){
                    console.log("adduser error", err)
                    res.send("error",err)
                }
            })                
            }            
        }catch(err){
            if(err){
                console.log(err)                
            }
        }
    },
    findAllUser: async (req, res)=>{
        try {
            await userModel.findAll()
            .then(users=>{
                res.send(users)
            })
            .catch((err)=>{
                if(err){
                    console.log("findalluserError 1", err)
                }
            })
        } catch (err) {
            if(err){
                console.log("findalluserError",err)
            }
        }
    },    
        findUserById: async(req, res)=>{
            const id = req.body.id;            
            try{
                await userModel.findOne({
                    where:{userId:id}
                }).then((data)=>{
                    res.send(data)
                }).catch((err)=>{
                    res.send("error",err)
                })                
            }catch(err){
                if(err){
                    console.log("findbyidError",err)
                }
            }
        },        
        deleteUser: async (req,res) =>{
        
            const id = req.params.id;
            try {
                    await userModel.destroy({where:{userId:id}})
                        .then((data)=>{
                            console.log("line 70",data)
                            if(data==1){
                            return res.send({status:200, message:"user is deleted successfully"})
                            }
                            else{
                                return res.send({status:200, message:`user is deleted with ${id}, user is not regiester with us`})   
                            }
                        }).catch((err)=>{
                            if(error){
                                console.log("delete User error", error);
                                return res.send({status: "401", message: `something bad happened. ${error}`});
                        }
                        })

            } catch (error) {
                if(error){
                    console.log("delete User error", error);
                    return res.send({status: "401", message: `something bad happened. ${error}`});
            }
            
            }
        },
        deleteAllUsers : async(req,res)=>{
            try {
                await userModel.destroy({where:{},
                    truncate:false
                    })
                .then((users)=>{
                    return res.json({status:200, message:"All users are deleted successfully"})
                }).catch((err)=>{
                    if(err){
                        return res.json({status:400, message:`users are not deleted ${err}`})
                    }
                })
            } catch (error) {
                if(error){
                    console.log("delete all users", error)
                    return res.send({status:401, message:`something bad happened.. ${error}`})
                }
            }
        },
        updateUser: async (req,res) =>{
            try {
                await userModel.update(req.body, {
                    where:{userId:req.params.id}
                }).then((user)=>{
                    return res.send({status:200, message: "user update successfully"})
                }).catch((err)=>{
                    if(err){
                        console.log("update user",err)
                        return res.send({status:200, message:`update user ${err}`})
                    }
                })                
            } catch (error) {
                if(error){
                    console.log("update user error", error)
                    return res.send({status:401, message:`something bad happened ${error}`})
                }
            }
        }
    
}