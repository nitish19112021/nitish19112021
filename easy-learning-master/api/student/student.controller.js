const Student = require('./student.model');
const Teacher = require('../teacher/teacher.model');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../../config/main.config');
const errorConfig = require('../../config/error.config');

module.exports = {
    onRegister: (studentDetails) => {
        return new Promise((resolve, reject) => {
            if (studentDetails && studentDetails.mobileNo) {
                Student.find({ "mobileNo": studentDetails.mobileNo }, (err, data) => {
                    if (err) {
                        return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                    }
                    else {
                        if (data.length > 0) {
                            return reject({ status: 400, message: 'Student Already Exist' })
                        }
                        const student = new Student({
                            mobileNo: studentDetails.mobileNo
                        });
                        student.save().then(data => {
                            return resolve({ success: true, message: 'Registered Successfully' })
                        }).catch(err => {
                            return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                        })
                    }
                })

            }else{
                return reject({ status: 400, message: errorConfig.BAD_REQUEST })
            }
        })
    },
    onLogin: (loginDetails) => {
        return new Promise((resolve, reject) => {
            if (loginDetails && loginDetails.mobileNo) {
                Student.findOne({ "mobileNo": loginDetails.mobileNo }, (err, data) => {
                    if (err) {
                        return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                    }
                    if (data == null) {
                        return reject({ status: 404, message: 'Student Not Exist' })
                    }
                    else {
                        const token = jwt.sign({ id: data._id, role: 'student' }, config.privateKey);
                        return resolve({ success: true, token: token, userId: data._id, message: "LoggedIn Successfully" })
                    }
                })
            }
        })
    },
    getStudentDetails: (studentDetails) => {
        return new Promise((resolve, reject) => {
            if (studentDetails && studentDetails.userId) {
                Student.findOne({ "_id": studentDetails.userId }, (err, data) => {
                    if (err) {
                        return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                    }
                    if (data == null) {
                        return reject({ status: 404, message: 'Student Not Exist' })
                    }
                    else {
                        return resolve({ success: true, data: data, message: errorConfig.SUCCESS_MESSAGE })
                    }
                })
            }else{
                return reject({ status: 400, message: errorConfig.BAD_REQUEST })
            }
        })
    },
    updateStudent: (studentDetails) => {
        return new Promise((resolve, reject) => {
            if (studentDetails && studentDetails.userId) {
                Student.find({ "_id": studentDetails.userId }, (err, data) => {
                    if (err) {
                        return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                    }
                    else {
                        if (data.length == 0) {
                            return reject({ status: 400, message: 'Student Not Exist' })
                        }
                        Student.updateOne({ "_id": studentDetails.userId },
                            {
                                $set: {
                                    "name": studentDetails.name,
                                    "board": studentDetails.board,
                                    "class": studentDetails.class,
                                    "status": 'active',
                                    "role": config.roles[0]
                                }
                            }, (error, data) => {
                                if (error) {
                                    return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                                }
                                return resolve({ success: true, message: 'Student Updated Successfully' })
                            })
                    }

                })


            }else{
                return reject({ status: 400, message: errorConfig.BAD_REQUEST })
            }
        })
    },
    updateStudentProfile: (studentDetails) => {
        return new Promise((resolve, reject) => {
            if (studentDetails && studentDetails.userId) {
                Student.find({ "_id": studentDetails.userId }, (err, data) => {
                    if (err) {
                        return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                    }
                    else {
                        if (data.length == 0) {
                            return reject({ status: 400, message: 'Student Not Exist' })
                        }
                        Student.updateOne({ "_id": studentDetails.userId },
                            {
                                $set: {
                                    "name": studentDetails.name,
                                    "board": studentDetails.board,
                                    "class": studentDetails.class,
                                    "city": studentDetails.city,
                                    "email" : studentDetails.email,
                                    "gender" : studentDetails.gender,
                                    "status": 'active',
                                    "role": config.roles[0]
                                }
                            }, (error, data) => {
                                if (error) {
                                    return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                                }
                                return resolve({ success: true, message: 'Student Updated Successfully' })
                            })
                    }

                })


            }else{
                return reject({ status: 400, message: errorConfig.BAD_REQUEST })
            }
        })
    },
    addSubscription: (subscriptionDetails) => {
        return new Promise((resolve, reject) => {
            if (subscriptionDetails && subscriptionDetails.teacherId) {
                let newExpiryDate = new Date().setDate(new Date().getDate() + 30);
                let newIsoDate = new Date(newExpiryDate).toISOString();
                let subscriptionObj = {
                    teacherId: subscriptionDetails.teacherId,
                    expireOn: newIsoDate
                }

                Student.find({ "subscriptions.teacherId": subscriptionDetails.teacherId }, (err, data) => {
                    if (err) {
                        return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                    }
                    if (data.length == 0) {
                        Student.update({ "_id": subscriptionDetails.userId }, {
                            $push: { subscriptions: subscriptionObj }
                        }, (error, datas) => {
                            if (error) {
                                return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                            }
                            if (datas) {
                                Teacher.update({ "_id": subscriptionDetails.teacherId },
                                    {
                                        $inc: { 'noofStudents': 1 },
                                    }, (error, result) => {
                                        if (error) {
                                            return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                                        }
                                        console.log("res", result);
                                        return resolve({ success: true, message: 'Subscription Added Successfully' })
                                    })

                            } else {
                                return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                            }

                        })
                    }
                    else {
                        return reject({ status: 400, message: "Teacher Already Subscribed" })
                    }
                })

            } else {
                return reject({ status: 400, message: errorConfig.BAD_REQUEST })
            }
        })
    },
    updateSubscription: (subscriptionDetails) => {
        return new Promise((resolve, reject) => {
            if (subscriptionDetails && subscriptionDetails.teacherId) {
                let newExpiryDate = new Date().setDate(new Date().getDate() + 30);
                let newIsoDate = new Date(newExpiryDate).toISOString();
                console.log("newdate", newExpiryDate, newIsoDate);
                Student.update({ "_id": subscriptionDetails.userId, "subscriptions.teacherId": subscriptionDetails.teacherId },
                    { $set: { "subscriptions.$.expireOn": newIsoDate } }, (err, data) => {
                        if (err) {
                            return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                        }
                        return resolve({ success: true, message: 'Subscription Updated Successfully' })
                    })

            } else {
                return reject({ status: 400, message: errorConfig.BAD_REQUEST })
            }
        })
    },
    subscriptionStatus: (subscriptionDetails) => {
        return new Promise((resolve, reject) => {
            if (subscriptionDetails && subscriptionDetails.teacherId) {
                Student.findOne({ "_id": subscriptionDetails.userId, "subscriptions.teacherId": subscriptionDetails.teacherId }, (err, data) => {
                    if (err) {
                        return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                    }
                    if (data) {
                        let currentDate = new Date().toISOString();
                        let status = data.subscriptions.filter(item => item.teacherId == subscriptionDetails.teacherId)
                        if (status[0].expireOn < currentDate) {
                            return resolve({ success: true, status: 2, data: data, message: 'Subscription Expired' })
                        }

                        return resolve({ success: true, status: 0, data: data, message: 'Teacher Already Subscribed' })
                    } else {
                        return resolve({ success: true, status: 1, data: data, message: 'Teacher Not Subscribed' })
                    }
                })


            } else {
                return reject({ status: 400, message: errorConfig.BAD_REQUEST })
            }
        })
    },
    getSubscriptions: (subscriptionDetails) => {
        return new Promise((resolve, reject) => {
            if (subscriptionDetails && subscriptionDetails.userId) {

                Student.findOne({ _id: subscriptionDetails.userId }).populate('subscriptions.teacherId').exec((err, data) => {
                    if (err) {
                        return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                    }
                    console.log("teach", data);
                    return resolve({ success: true, data: data, message: 'Data Get Successfully' })
                })


            } else {
                return reject({ status: 400, message: errorConfig.BAD_REQUEST })
            }
        })
    },
}

