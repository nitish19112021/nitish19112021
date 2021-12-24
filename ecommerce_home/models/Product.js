const { timeStamp } = require("console");
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title : {type:String},
    desc: {type:String},
    img:{type:String},
    categories:{type:Array},
    size:{type:String},
    color:{type:String},
    price:{type:Number},    
},{timestamps:true})

module.exports = mongoose.model("Product", ProductSchema)