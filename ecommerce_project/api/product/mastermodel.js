const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const categoryModel = new Schema({
    nameCat: String,
    
    subCategory:[{
        nameSubcat:String,
    }]
})

module.exports = mongoose.model("categorymodel",categoryModel)

