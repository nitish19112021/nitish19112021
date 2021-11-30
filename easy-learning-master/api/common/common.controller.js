const Student = require('../student/student.model');
const Teacher = require('../teacher/teacher.model');
const Admin = require('../admin/admin.model');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('../../config/main.config');
const errorConfig = require('../../config/error.config');

module.exports = {


    onLogin: (loginDetails) => {
        return new Promise((resolve, reject) => {
            if (loginDetails && loginDetails.mobileNo) {
                Admin.find({ "mobileNo": loginDetails.mobileNo }, (err, data) => {
                    if (err) {
                        return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                    }

                    if (data.length == 0) {
                        Teacher.find({ "mobileNo": loginDetails.mobileNo }, (error, result) => {
                            if (error) {
                                return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                            }
                            if (result.length == 0) {
                                return reject({ status: 404, message: errorConfig.NOT_FOUND })
                            }
                            else {
                                const token = jwt.sign({ id: result._id, role: 'teacher' }, config.privateKey);
                                return resolve({ success: true, token: token, data: result, message: "LoggedIn Successfully" })
                            }

                        })



                    } else {
                        const token = jwt.sign({ id: data._id, role: 'admin' }, config.privateKey);
                        return resolve({ success: true, token: token, data: data, message: "LoggedIn Successfully" })
                    }

                })


            } else {
                return reject({ status: 400, message: errorConfig.BAD_REQUEST })
            }
        })
    },
    getProfile: (profileDetails) => {
        return new Promise((resolve, reject) => {
            if (profileDetails && profileDetails.role) {
                if (profileDetails.role == 'student') {
                    Student.find({ "_id": profileDetails.userId }, (err, data) => {
                        if (err) {
                            return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                        }
                        return resolve({ success: true, data: data, message: errorConfig.SUCCESS_MESSAGE })

                    })

                } else {
                    Teacher.find({ "_id": profileDetails.userId }, (err, data) => {
                        if (err) {
                            return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                        }
                        return resolve({ success: true, data: data, message: errorConfig.SUCCESS_MESSAGE })

                    })
                }


            } else {
                return reject({ status: 400, message: errorConfig.BAD_REQUEST })
            }
        })
    }
}