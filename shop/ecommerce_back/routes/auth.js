const express = require('express')
const User = require("../models/User")
const router = express.Router();
const passport = require('passport')
const authController = require('../controller/authController')
require("dotenv").config()
//register

router.post('/register', authController.register)

//login
router.post('/login',authController.login)

// router.post('/login',
// passport.authenticate('local'),authController.login,
// function(req, res) {
//   // If this function gets called, authentication was successful.
//   // `req.user` contains the authenticated user.
//   res.json({message:"done", user:req.user})
// });



module.exports = router