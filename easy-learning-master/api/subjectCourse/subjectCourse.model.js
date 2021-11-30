const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectCourseSchema = new Schema({
    class: {
        type: String,
        required: true
    },
    board: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    chapter: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },

  creationDate: { type: Date, default: Date.now },
    updationDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SubjectCourse', SubjectCourseSchema);
