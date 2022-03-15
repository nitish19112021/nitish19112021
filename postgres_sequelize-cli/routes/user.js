const express = require("express");
const router = express.Router()
const userController = require("../controller/userController")

router.get('/user', userController.userRegister)

module.exports = router;