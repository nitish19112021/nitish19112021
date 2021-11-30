const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
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
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    students: [{
        studentId: {
            type: Schema.Types.ObjectId,
            ref: 'student'
        }
    }],
    chapter: [{
        type: Schema.Types.ObjectId,
        ref: 'chapter',
    }],
    creationDate: { type: Date, default: Date.now },
    updationDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Course', CourseSchema);
