const { timeStamp } = require("console");
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const { stringify } = require("querystring");

const userSchema = new mongoose.Schema({
    firstname : {
        type:String
    },
    lastname : {
        type:String
    },
    username : {
        type:String
    },
    email: {
        type:String
    },
    password:{
        type:String
    },  
    mobile:{
        type:Number
    },    
    otp:{
        type:String
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    accessToken:{
        type:String,
    },
    refreshToken:{
        type:String,
    }
},{timestamps:true})

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);