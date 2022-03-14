const express = require('express');
const router = express.Router();
const db = require('../config/database')
const userModel = require('../model/user')
const userController = require("../controller/userController")

router.get('/findAllUser', userController.findAllUser)

router.post('/Register', userController.register)
router.post('/login', userController.userLogin)
router.post('/findbyid', userController.findUserById)
router.post('/deleteUser/:id', userController.deleteUser)
router.post('/deleteAllUser', userController.deleteAllUsers)
router.post('/updateUser/:id', userController.updateUser)

module.exports = router