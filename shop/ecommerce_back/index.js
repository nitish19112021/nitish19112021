require('dotenv').config()

 const express = require("express")
 const app = express()
 const cors = require('cors')
 const User = require("./models/User");
///////

const stripe = require('stripe')('sk_test_tR3PYbcVNZZ796tH88S4VQ2u')


//import passport and localStrategy

const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session') 

const jwt = require("jsonwebtoken")
const CryptoJS = require("crypto-js")
const bodyParser = require("body-parser");  


const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const prodRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const cartRoute = require("./routes/cart");
const stripeRoute = require('./routes/stripe')

app.use(cors())


const mongoose = require("mongoose");

//database connection

mongoose.connect(process.env.connection)
.then(()=>{console.log("db connected successfulley")})
.catch((error)=>{console.log(error)})


//////////////////
  
// app.use(session({ 
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false
    
//   }));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded())

app.use(session({
    secret:'keyborad cat',
    resave:false,
    saveUninitialized:false,
    cookie:{secure:false, maxAge:60000}
}))


app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(
    function(username, password,done) {
        console.log(username,password)

        User.findOne({username:username},(err, user)=>{
            if(err){
                console.log('err',err)
            }
            if(user){
                console.log("user",user)
                const hashedPassword = CryptoJS.AES.decrypt(
                    user.password,
                    process.env.pass_sec
                    );
                    const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8)
                if(Originalpassword === password){
                    console.log('login')
                    return done(null, user)
                }else{
                    console.log("not login")                    
                }
            }else{
                console.log('user not found')
            }
        })
    }
  ));

passport.serializeUser((user,done)=>{
    if(user){
        return done(null, user.id)
    }
    return(null, false)
});
passport.deserializeUser((id, done)=>{
    User.findOne(id,(err, user)=>{
        if(err){
            return done(null, false)            
        }
        return done(null, user)
    })    
})


// Passport Config


app.use("/api/user", userRoute)
//login
app.use("/api/auth", authRoute)
app.use("/api/products", prodRoute)
app.use("/api/order", orderRoute)
app.use("/api/cart", cartRoute)
app.use('/api/stripe', stripeRoute)

const PORT = process.env.PORT || 5000


app.listen(PORT,()=>{
    console.log("server started at localhost: "+PORT)
})