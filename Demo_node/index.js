require('dotenv').config()

const express = require('express');
const mongoose =  require('mongoose');
const dbConfig = require('./config/dbConfig')
const app = express();

//get routes
const userRoutes = require('./api/userRoutes')

//middleware
app.use(express.json());

app.use('/api/user', userRoutes)



//database connection
mongoose.connect(dbConfig.url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('database connected..')
}).catch((err)=>{
  err &&  console.log('database not connected.')
})

//server
const port = process.env.port || 5000
app.listen(port, ()=>{
    console.log('server started on port : '+port);
})