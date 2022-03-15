const User = require("../models/user")

module.exports = {
userRegister : async (req,res)=>{
    try {
        const body = req.body;
        const user = await User.create(body)
        if(!user){
            console.log("user not created");
            res.send({message:"user not created."})
        }
        res.send({user:user})
    } catch (error) {
        if(error){
            console.log("userRegister Error", error)
        }
    }
}
}