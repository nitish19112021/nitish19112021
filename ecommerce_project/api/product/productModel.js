const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    
    productName: String,
    productQuantity:{
        type:String
    },
    productPrice:{
        type:Number
    },
    productDescription:{
        type:String
    },
    productImage:{
        type:String
    },
    paid:{
        type:Boolean,
        default:false
    },
    
    
} ,{timestamps:true})

module.exports = mongoose.model("productdetail",productSchema)