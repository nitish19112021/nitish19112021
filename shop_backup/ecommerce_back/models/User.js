const { timeStamp } = require("console");
const mongoose = require("mongoose");

// const Schema = mongoose.Schema();

// const userSchema= new Schema({

// })

const userSchema = new mongoose.Schema({
    username : {
        type:String
    },
    email: {
        type:String
    },
    password:{
        type:String
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    
},{timestamps:true})

module.exports = mongoose.model("User",userSchema)