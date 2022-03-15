require('dotenv').config()
const express = require('express')
const app = express();
const user = require('./routes/user')

app.use(express.json())

app.use("/api",user)

const port = process.env.port;

app.listen(port, ()=>{
    console.log(`process started on https:localhost:${port}`)
})