
const SubjectCourse = require('./subjectCourse.model');
const config = require('../../config/main.config');
const errorConfig = require('../../config/error.config');

module.exports = {

    addCourse: (courseDetails) => {
        return new Promise((resolve, reject) => {
            if (courseDetails && courseDetails.chapter) {
                const subjectCourse = new SubjectCourse({
                    class: courseDetails.class,
                    board: courseDetails.board,
                    subject: courseDetails.subject,
                    chapter: courseDetails.chapter,
                    topic: courseDetails.topic,
                    title: courseDetails.title,
                    description: courseDetails.description,
                    videoUrl: courseDetails.videoUrL
                });
                    console.log("Ch",courseDetails);
                subjectCourse.save().then(data => {
                    return resolve({ success: true, message: 'Subject Course Added Successfully' })
                }).catch(err => {
                    console.log("err",err);
                    return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                })
         

            }else{
                return reject({ status: 400, message: errorConfig.BAD_REQUEST })
            }
        })
    },
    // getCourse: (courseDetails) => {
    //     return new Promise((resolve, reject) => {
    //         if (courseDetails && courseDetails.subject) {
    //             Course.find({ "board": courseDetails.board, "subject": courseDetails.subject, "class": courseDetails.class }, (err, data) => {
    //                 if (err) {
    //                     return reject({ status: 400, message: errorConfig.BAD_REQUEST })
    //                 }
    //                 return resolve({ success: true, data: data, message: errorConfig.SUCCESS_MESSAGE })
    //             })

    //         }else{
    //             return reject({ status: 400, message: errorConfig.BAD_REQUEST })
    //         }
    //     })
    // }
}

