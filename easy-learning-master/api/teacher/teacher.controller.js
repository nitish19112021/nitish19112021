const Teacher = require('./teacher.model');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Broadcast = require('../broadcasts/broadcasts.model');
const config = require('../../config/main.config');
const errorConfig = require('../../config/error.config');

module.exports = {

    getDetails: (teacherDetails) => {
        return new Promise((resolve, reject) => {
            if (teacherDetails) {
                Teacher.findOne({
                    "firstName": teacherDetails.firstName,
                    "lastName": teacherDetails.lastName,
                    "classes": { "$in": teacherDetails.classes },
                    "subjects": { "$in": teacherDetails.subjects }

                }, (err, data) => {
                    if (err) {
                        return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                    }
                    console.log("dt", data);
                    if (data) {
                        return resolve({ success: true, data: data, message: 'Data Get Successfully' })
                    } else {
                        return resolve({ success: true, data: data, message: "No Data Found" })
                    }
                })
            } else {
                return reject({ status: 400, message: errorConfig.BAD_REQUEST })
            }
        })
    },
    getDetailsById: (teacherDetails) => {
        return new Promise((resolve, reject) => {
            if (teacherDetails) {
                Teacher.findOne({ "_id": teacherDetails.id }, (err, data) => {
                    if (err) {
                        return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                    }
                    if (data) {
                        return resolve({ success: true, data: data, message: 'Data Get Successfully' })
                    } else {
                        return resolve({ success: true, data: data, message: "No Data Found" })
                    }
                })
            } else {
                return reject({ status: 400, message: errorConfig.BAD_REQUEST })
            }
        })
    },
    onLogin: (loginDetails) => {
        return new Promise((resolve, reject) => {
            if (loginDetails && loginDetails.email) {
                Teacher.findOne({ "email": loginDetails.email, "password": loginDetails.password }, (err, data) => {
                    if (err) {
                        return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                    }
                    if (data == null) {
                        return reject({ status: 404, message: 'Invalid Credentials' })
                    }
                    else {
                        const token = jwt.sign({ id: data._id, role: 'teacher' }, config.privateKey);
                        return resolve({ success: true, token: token, data: data, message: "LoggedIn Successfully" })
                    }
                })
            } else {
                return reject({ status: 400, message: errorConfig.BAD_REQUEST })
            }
        })
    },
    getUpcoming: (teacherDetails) => {
        return new Promise((resolve, reject) => {
            if (teacherDetails && teacherDetails.userId) {
                Broadcast.find({ "status": "upcoming", "snippet.description": teacherDetails.name }, (err, data) => {
                    if (err) {
                        return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                    }
                    if (data.length == 0) {
                        return resolve({ success: true, data: data, message: "No Data Found" })
                    } else {
                        return resolve({ success: true, data: data, message: errorConfig.SUCCESS_MESSAGE })
                    }

                })
            }

        })


    },
    changePassword: (passwordDetails) => {
        return new Promise((resolve, reject) => {
            if (passwordDetails && passwordDetails.userId) {
                Teacher.find({ "_id": passwordDetails.userId }, (err, data) => {
                    if (err) {
                        return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                    }
                    if (data.length == 0) {
                        return reject({ status: 404, message: errorConfig.NOT_FOUND })
                    }
                    else {
                        if (data[0].password == passwordDetails.currentPassword) {
                            Teacher.update({ "_id": passwordDetails.userId }, {
                                $set: {
                                    "password": passwordDetails.newPassword
                                }
                            }, (error, result) => {
                                if (error) {
                                    return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                                }
                                console.log("ress", result)
                                return resolve({ success: true, message: "Password Changed Successfully" })
                            })

                        } else {
                            return reject({ status: 400, message: 'Invalid Current Password' })
                        }
                    }
                })

            } else {
                return reject({ status: 400, message: errorConfig.BAD_REQUEST })
            }

        })


    },
    updateTeacher: (teacherDetails) => {
        return new Promise((resolve, reject) => {
            if (teacherDetails && teacherDetails.userId) {
                Teacher.update({ "_id": teacherDetails.userId }, {
                    $set: {
                        "email" : teacherDetails.email,
                        "gender": teacherDetails.gender,
                        "city" : teacherDetails.city,
                        "mobileNo" : teacherDetails.mobileNo,
                        "about" : teacherDetails.about,
                        "demoId" : teacherDetails.demoId,
                    }
                }, (error, result) => {
                    if (error) {
                        return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                    }
                    console.log("res",result);
                     return resolve({ success: true, message: "Teacher Updated Successfully" })
                })

            } else {
                return reject({ status: 400, message: 'Invalid Current Password' })
            }

        })

    }


}

