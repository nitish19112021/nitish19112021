
const Course = require('./course.model');
const mongoose = require('mongoose');
const config = require('../../config/main.config');
const errorConfig = require('../../config/error.config');

module.exports = {

    addCourse: (courseDetails) => {
        return new Promise((resolve, reject) => {
            if (courseDetails && courseDetails.chapter) {
                Course.find({ "chapter": courseDetails.chapter, "subject": courseDetails.subject, "class": courseDetails.class }, (err, data) => {
                    if (err) {
                        return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                    }
                    else {
                        if (data.length > 0) {
                            return reject({ status: 400, message: 'Chapter Already Exist' })
                        }
                        const course = new Course({
                            class: courseDetails.class,
                            board: courseDetails.board,
                            subject: courseDetails.subject,
                            chapter: courseDetails.chapter,
                            topics: courseDetails.topicArray
                        });
                        console.log("couse",course);
                        course.save().then(data => {
                            return resolve({ success: true, message: 'Content Added Successfully' })
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
    getCourse: (courseDetails) => {
        return new Promise((resolve, reject) => {
            if (courseDetails && courseDetails.subject) {
                Course.find({ "board": courseDetails.board, "subject": courseDetails.subject, "class": courseDetails.class }, (err, data) => {
                    if (err) {
                        return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                    }
                    return resolve({ success: true, data: data, message: errorConfig.SUCCESS_MESSAGE })
                })

            }else{
                return reject({ status: 400, message: errorConfig.BAD_REQUEST })
            }
        })
    }
}

