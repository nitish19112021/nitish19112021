const express = require("express")
const app = express()
require("dotenv").config();
const mongoose = require("mongoose")
const appRoutes = require("./app.routes")
const config = require("./config/db.config")
app.use(express.json())
const createError = require("http-errors")


mongoose.connect(config.url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{console.log("Database connected successfully")})
.catch((err)=>{
    if(err){
        console.log("Database not connected.")
        process.exit()
    }
})

 appRoutes.useRoutes(app)

 


port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log("server connected "+port)
})

