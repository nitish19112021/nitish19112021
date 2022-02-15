const express = require("express")
const cors = require('cors')
const app = express()
require('dotenv').config()
const mongoose = require("mongoose");
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const prodRoute = require("./routes/product")
const orderRoute = require("./routes/order")
const cartRoute = require("./routes/cart")
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.connection)
.then(()=>{console.log("db connected successfulley")})
.catch((error)=>{console.log(error)})

app.use("/api/user", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/products", prodRoute)
app.use("/api/order", orderRoute)
app.use("/api/cart", cartRoute)
const PORT = process.env.PORT || 5000


app.listen(PORT,()=>{
    console.log("server started at localhost: "+PORT)
})