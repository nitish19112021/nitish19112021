var express = require('express');
const teacherController = require('./teacher.controller.js');
const router = express.Router();


//  get Details of Teacher based on class,subject and name
router.post('/getDetails', (req, res, next) => {
    const teacherDetails = req.body;
    console.log("tt", teacherDetails);
    try {
        teacherController.getDetails(teacherDetails).then(result => {
            return res.status(201).send(result);
        }, err => {
            console.log("ttt", err);
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});

//  get Details of Teacher based on Id
router.post('/getDetailsById', (req, res, next) => {
    const teacherDetails = req.body;
    console.log("tt", teacherDetails);
    try {
        teacherController.getDetailsById(teacherDetails).then(result => {
            return res.status(200).send(result);
        }, err => {
            console.log("ttt", err);
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});

//  update student subscriptions
router.post('/updateStudentCount', (req, res, next) => {
    const teacherDetails = req.body;
    console.log("tt", teacherDetails);
    try {
        teacherController.updateStudentCount(teacherDetails).then(result => {
            return res.status(200).send(result);
        }, err => {
            console.log("ttt", err);
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});

// teacher login
router.post('/login', (req, res, next) => {
    const loginDetails = req.body;
    try {
        teacherController.onLogin(loginDetails).then(result => {
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

// get upcoming videos of particular teacher 
router.post('/myUpcoming', (req, res, next) => {
    const teacherDetails = req.body;
    try {
        teacherController.getUpcoming(teacherDetails).then(result => {
            return res.status(200).send(result);
        }, err => {
            console.log("ttt", err);
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});

// change password of Teacher
router.post('/changePassword', (req, res, next) => {
    const passwordDetails = req.body;
    try {
        teacherController.changePassword(passwordDetails).then(result => {
            return res.status(200).send(result);
        }, err => {
            console.log("ttt", err);
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});

// update Teacher Details
router.post('/updateTeacher', (req, res, next) => {
    const teacherDetails = req.body;
    try {
        teacherController.updateTeacher(teacherDetails).then(result => {
            return res.status(200).send(result);
        }, err => {
            console.log("ttt", err);
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});


module.exports = router;