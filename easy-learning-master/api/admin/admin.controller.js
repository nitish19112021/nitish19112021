const Teacher = require('../teacher/teacher.model');
const Student = require('../student/student.model');
const Admin = require('./admin.model');
const Broadcast = require('../broadcasts/broadcasts.model');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('../../config/main.config');
const errorConfig = require('../../config/error.config');

module.exports = {

    addTeacher: (teacherDetails) => {
        return new Promise((resolve, reject) => {
            if (teacherDetails && teacherDetails.mobileNo) {
                Teacher.find({ mobileNo: teacherDetails.mobileNo }, (err, data) => {
                    if (err) {
                        return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                    }
                    if (data.length > 0) {
                        return reject({ status: 400, message: errorConfig.RECORD_EXISTS })
                    } else {
                        console.log("rere", teacherDetails)
                        const teacher = new Teacher({
                            firstName: teacherDetails.firstName,
                            lastName: teacherDetails.lastName,
                            mobileNo: teacherDetails.mobileNo,
                            email: teacherDetails.email,
                            address: teacherDetails.address,
                            city: teacherDetails.city,
                            state: teacherDetails.state,
                            qualification: teacherDetails.qualification,
                            subjects: teacherDetails.subjects,
                            classes: teacherDetails.classes,
                            board: teacherDetails.board,
                            subscription: teacherDetails.subscription,
                            demoId: teacherDetails.demoId,
                            about: teacherDetails.about,
                            noofStudents:0,
                            price:0,
                            imgUrl: teacherDetails.imgUrl,
                            role: 'teacher'
                        })
                        teacher.save().then(data => {
                            return resolve({ success: true, message: 'Added Successfully' })
                        }).catch(err => {
                            return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                        })
                    }
                })


            } else {
                return reject({ status: 400, message: errorConfig.BAD_REQUEST })
            }

        })
    },
    getAllTeacher: () => {
        return new Promise((resolve, reject) => {
            Teacher.find({}, (err, data) => {
                if (err) {
                    return reject({ status: 500, message: errorConfig.INTERNAL_ERROR })
                }
                return resolve({ success: true, message: errorConfig.SUCCESS_MESSAGE, data: data })
            })
        })
    },
    addAdmin: (adminDetails) => {
        return new Promise((resolve, reject) => {
            if (adminDetails && adminDetails.mobileNo) {
                const admin = new Admin({
                    name: adminDetails.name,
                    mobileNo: adminDetails.mobileNo,
                    email: adminDetails.email,
                    address: adminDetails.address,
                    city: adminDetails.city,
                    state: adminDetails.state,
                    password: adminDetails.password,
                    imgUrl: adminDetails.imgUrl,
                    role: 'admin'
                })
                admin.save().then(data => {
                    return resolve({ success: true, message: 'Added Successfully' })
                }).catch(err => {
                    return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                })
            } else {
                return reject({ status: 400, message: errorConfig.BAD_REQUEST })
            }
        })
    },
    updateTeacher: (teacherDetails) => {
        return new Promise((resolve, reject) => {
            console.log("tty", teacherDetails.teacherId);
            if (teacherDetails && teacherDetails.mobileNo) {
                Teacher.find({ "_id": teacherDetails.teacherId }, (err, data) => {
                    if (err) {
                        return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                    }
                    else {
                        if (data.length == 0) {
                            return reject({ status: 400, message: 'Teacher Not Exist' })
                        }
                        Teacher.updateOne({ "_id": mongoose.Types.ObjectId(teacherDetails.teacherId) },
                            {
                                $set: {
                                    firstName: teacherDetails.firstName,
                                    lastName: teacherDetails.lastName,
                                    mobileNo: teacherDetails.mobileNo,
                                    email: teacherDetails.email,
                                    address: teacherDetails.address,
                                    city: teacherDetails.city,
                                    state: teacherDetails.state,
                                    qualification: teacherDetails.qualification,
                                    subjects: teacherDetails.subjects,
                                    classes: teacherDetails.classes,
                                    board: teacherDetails.board,
                                    subscription: teacherDetails.subscription,
                                    demoId: teacherDetails.demoId,
                                    about: teacherDetails.about,
                                    imgUrl: teacherDetails.imgUrl
                                }
                            }, (error, data) => {
                                if (error) {
                                    return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                                }
                                return resolve({ success: true, message: 'Teacher Updated Successfully' })
                            })
                    }

                })


            }
        })
    },
    getAllStudent: () => {
        return new Promise((resolve, reject) => {
            Student.find({}, (err, data) => {
                if (err) {
                    return reject({ status: 500, message: errorConfig.BAD_REQUEST })
                }
                return resolve({ success: true, message: errorConfig.SUCCESS_MESSAGE, data: data })
            })
        })
    },

    adminLogin: (adminDetails) => {
        return new Promise((resolve, reject) => {
            if (adminDetails && adminDetails.email) {
                Admin.findOne({ "email": adminDetails.email, "password": adminDetails.password }, (err, data) => {
                    if (err) {
                        return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                    }
                    if (data.length == 0) {
                        return reject({ status: 404, message: 'Invalid Credentials' })
                    }
                    else {
                        const token = jwt.sign({ id: data._id, role: 'admin' }, config.privateKey);
                        return resolve({ success: true, token: token, userId: data._id, message: "LoggedIn Successfully" })
                    }
                })
            }
        })
    },
    onaddBroadcast: (broadcastDetails) => {
        return new Promise((resolve, reject) => {
            console.log("ggy",broadcastDetails);
            if (broadcastDetails && broadcastDetails.length > 0) {
                Broadcast.insertMany(broadcastDetails, (err, data) => {
                    if (err) {
                        return reject({ status: 400, message: err })
                    }
                    return resolve({ success: true, message: 'Data Added Successfully' })

                })
            } else {
                return reject({ status: 400, message: errorConfig.BAD_REQUEST })
            }
        })
    },

}

