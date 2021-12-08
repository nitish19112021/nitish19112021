const express = require("express")
const mongoose = require("mongoose");
const userdata = require('./api/auth/userRoutes')
const app = express();
app.use(express.json())

require("dotenv").config();


mongoose.connect("mongodb://127.0.0.1:27017/ecommerce",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("mongodb database connected successfully")
}).catch((err)=>{console.log("error"+err)})

app.use('/api',userdata)



const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log("server started.."+PORT)
})