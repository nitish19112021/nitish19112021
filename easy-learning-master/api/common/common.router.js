var express = require('express');
const commonController = require('./common.controller.js');
const auth = require('../../middleware/authorization');
const router = express.Router();


// common login for teacher,admin, instructor and student
router.post('/login', (req, res, next) => {
    const loginDetails = req.body;
    try {
        commonController.onLogin(loginDetails).then(result => {
            return res.status(200).send(result);
        }, err => {
            console.log("ttrrrt", err);
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});

// get profile data of student or teacher
router.post('/getProfile', (req, res, next) => {
    const profileDetails = req.body;
    try {
        commonController.getProfile(profileDetails).then(result => {
            return res.status(200).send(result);
        }, err => {
            console.log("ttrrrt", err);
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});

module.exports = router;