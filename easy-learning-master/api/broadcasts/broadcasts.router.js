var express = require('express');
const broadcastController = require('./broadcasts.controller.js');
const auth = require('../../middleware/authorization');
const router = express.Router();




// get broadcast data based on class
router.post('/getBroadcasts', auth, (req, res, next) => {
    const classDetails = req.body;
    try {
        broadcastController.filterBroadcasts(classDetails).then(result => {
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

// get all upcoming broadcasts
router.get('/getAllBroadcasts', (req, res, next) => {

    try {
        broadcastController.getAllBroadcasts().then(result => {
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

// get all live broadcasts
router.get('/getLiveBroadcasts', (req, res, next) => {

    try {
        broadcastController.getLiveBroadcasts().then(result => {
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

// get old broadcast based on teacher name and subject
router.post('/getOldBroadcasts', auth, (req, res, next) => {
    const broadcastDetails = req.body;
    try {
        broadcastController.getOldBroadcasts(broadcastDetails).then(result => {
            return res.status(200).send(result);
        }, err => {
            console.log("ttfg", err);
            return next(err)
        })
    }
    catch (err) {
        return next(err)
    }

});

// update status of broadcasts for old
router.post('/updateOldBroadcast', auth, (req, res, next) => {
    const broadcastDetails = req.body;
    try {
        broadcastController.updateOldStatusBroadcast(broadcastDetails).then(result => {
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

// update status of broadcasts for live
router.post('/updateLiveBroadcast', auth, (req, res, next) => {
    const broadcastDetails = req.body;
    try {
        broadcastController.updateLiveStatusBroadcast(broadcastDetails).then(result => {
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