const { timeStamp } = require("console");
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userId : {type:String},
    products: [
        {
            productId:{type:String},
            quantity:{type:Number,default:1}
        }
    ],
    amount:{type:Number},
    address:{type:Object},
    status:{type:String, default:"pending"}
    
    
},{timestamps:true})

module.exports = mongoose.model("Order",OrderSchema)