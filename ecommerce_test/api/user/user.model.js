const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type:String
    },
    userPassword: {
        type:String
    },
    userEmail:{
        type:String
    },
    userPhone:{
        type:String
    }
})

userSchema.pre('save', async function (next){
    // console.log(this.password)
     const salt =await bcrypt.genSalt(10);
     const hashpassword =await bcrypt.hash(this.userPassword,salt)
     this.userPassword = hashpassword;
     next()
})


module.exports = mongoose.model("userTable", userSchema)