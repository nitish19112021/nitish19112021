require('dotenv').config()
const express = require('express');
const app = express();
const db = require('./config/database')

const userApi = require('./routes/user')

app.use(express.json())
app.use('/api', userApi)

db.sequelize.sync().then(() =>{
  console.log("table created..")
})
.catch(error => console.log("db error: ", error));

app.listen(5000, ()=>{
    console.log('server connected.')
})