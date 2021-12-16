const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const cartModel = new Schema({
    userId:String,
    Items:[
       { type:Array,
           _id:{type:String }
        }
    ]

})

module.exports = mongoose.model("cartitem", cartModel)