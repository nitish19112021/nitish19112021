const express = require("express")
const mongoose = require("mongoose");
const userdata = require('./api/user/userRoutes')
const productData = require('./api/admin/adminRoute')
const cart = require("./api/cart/cart")
const app = express();

require("dotenv").config();
const logger = require('./log/logger')


mongoose.connect("mongodb://127.0.0.1:27017/ecommerce",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("mongodb database connected successfully")
}).catch((err)=>{console.log("error"+err)})


app.use(express.json())
app.use('/api',userdata)
app.use('/api/product',productData)
app.use('/api/cart',cart)


const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    
    console.log("server started.."+PORT)
    //logger.info("server started" +PORT)
})