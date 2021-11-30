const Broadcast = require('./broadcasts.model');
const mongoose = require('mongoose');
const config = require('../../config/main.config');
const errorConfig = require('../../config/error.config');

module.exports = {


    filterBroadcasts: (broadcastDetails) => {
        return new Promise((resolve, reject) => {
            if (broadcastDetails && broadcastDetails.class) {
                Broadcast.find({ "t": broadcastDetails.class, "status": "upcoming" }, (err, data) => {
                    if (err) {
                        return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                    }
                    else {
                        return resolve({ success: true, data: data, message: errorConfig.SUCCESS_MESSAGE });

                    }

                })


            } else {
                return reject({ status: 400, message: errorConfig.BAD_REQUEST })
            }
        })
    },
    getAllBroadcasts: () => {
        return new Promise((resolve, reject) => {
            Broadcast.find({ "status": "upcoming" }, (err, data) => {
                if (err) {
                    return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                }
                else {
                    return resolve({ success: true, data: data, message: errorConfig.SUCCESS_MESSAGE });

                }

            })

        })
    },
    getLiveBroadcasts: () => {
        return new Promise((resolve, reject) => {
            Broadcast.find({ "status": "live" }, (err, data) => {
                if (err) {
                    return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                }
                else {
                    return resolve({ success: true, data: data, message: errorConfig.SUCCESS_MESSAGE });
                }

            })

        })
    },
    getOldBroadcasts: (broadCastData) => {
        return new Promise((resolve, reject) => {
            console.log("bb", broadCastData.subject)
            Broadcast.find({
                "status": "old",
                "snippet.description": broadCastData.teacherName,
                "d": broadCastData.subject
            }, (err, data) => {
                if (err) {
                    return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                }
                else {
                    if (data.length == 0) {
                        return reject({ status: 400, message: 'No Record Found' })
                    }

                    return resolve({ success: true, data: data, message: errorConfig.SUCCESS_MESSAGE });

                }

            })

        })
    },
    updateOldStatusBroadcast: (broadcastDetails) => {
        return new Promise((resolve, reject) => {
            if (broadcastDetails && broadcastDetails.broadcastId) {
                Broadcast.find({ id: broadcastDetails.broadcastId }, (err, data) => {
                    if (err) {
                        console.log("errr", err);
                        return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                    }
                    else {
                        if (data.length == 0) {
                            return reject({ status: 400, message: 'No Record Found' })
                        }
                        if (data[0].status != 'old') {
                            Broadcast.update({ _id: data[0]._id }, {
                                $set: { status: 'old' }
                            }, (error, data) => {
                                if (error) {
                                    console.log("error", error);

                                    return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                                }
                                return resolve({ success: true, data: data, message: 'Broadcast Updated Successfully' });
                            })
                        } else {
                            return resolve({ success: true, data: data, message: 'Broadcast Already Updated' });
                        }

                    }

                })
            } else {
                return reject({ status: 400, message: errorConfig.BAD_REQUEST })
            }

        })
    },
    updateLiveStatusBroadcast: (broadcastDetails) => {
        return new Promise((resolve, reject) => {
            if (broadcastDetails && broadcastDetails.broadcastId) {
                Broadcast.find({ _id: broadcastDetails.broadcastId }, (err, data) => {
                    if (err) {
                        return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                    }

                    if (data.length == 0) {
                        return reject({ status: 400, message: 'No Record Found' })
                    }
                    Broadcast.update({ _id: data[0]._id }, {
                        $set: { status: 'live' }
                    }, (error, result) => {
                        if (error) {
                            console.log("error", error);

                            return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                        }
                        return resolve({ success: true, message: 'Broadcast Updated Successfully' });
                    })




                })
            } else {
                return reject({ status: 400, message: errorConfig.BAD_REQUEST })
            }

        })
    },



}

