var express = require('express');
const adminController = require('./admin.controller.js');
const broadcastController = require('..//broadcasts/broadcasts.controller');
const auth = require('../../middleware/authorization');
const router = express.Router();

//  add teacher
router.post('/addTeacher', (req, res, next) => {
    const teacherDetails = req.body;
    try {
        adminController.addTeacher(teacherDetails).then(result => {
            return res.status(201).send(result);
        }, err => {
            console.log("ttyt", err);
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }
});

//  get All Teachers
router.get('/getAllTeacher',auth, (req, res, next) => {
    try {
        adminController.getAllTeacher().then(result => {
            return res.status(200).send(result);
        }, err => {
            console.log("ttyt", err);
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }
});
// add admin
router.post('/addAdmin', (req, res, next) => {
    const adminDetails = req.body;
    try {
        adminController.addAdmin(adminDetails).then(result => {
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

// admin Login
router.post('/login', (req, res, next) => {
    const adminDetails = req.body;
    try {
        adminController.adminLogin(adminDetails).then(result => {
            return res.status(200).send(result);
        }, err => {
            console.log("adm", err);
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});

// update Teacher
router.post('/updateTeacher', (req, res, next) => {
    const teacherDetails = req.body;
    try {
        adminController.updateTeacher(teacherDetails).then(result => {
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

//  get All Students
router.get('/getAllStudent', (req, res, next) => {
    try {
        adminController.getAllStudent().then(result => {
            return res.status(200).send(result);
        }, err => {
            console.log("ttyt", err);
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});

//  Add Upcoming Broadcast
router.post('/addBroadcast', (req, res, next) => {
    const broadcastsDetails = req.body;
    console.log("broadcast",broadcastsDetails);
    try {
        adminController.onaddBroadcast(broadcastsDetails).then(result => {
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


module.exports = router;