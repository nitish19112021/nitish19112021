
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    mobileNo: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        default: 'pass@123'
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    subjects: [{
        type: String,
        required: true
    }],
    classes: [{
        type: String,
        required: true
    }],
    board: [{
        type: String,
        required: true
    }],
    subscription: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    gender: {
        type: String,
        default:""
    },
    demoId: {
        type: String,
        required: true
    },
    about: {
        type: String
    },
    noofStudents: {
        type: Number
    },
    studentReviews: {
        type: Number
    },
    imgUrl: {
        type: String
    },
    role: {
        type: String
    },
    creationDate: { type: Date, default: Date.now },
    updationDate: { type: Date, default: Date.now },
});

// Export the model
module.exports = mongoose.model('Teacher', TeacherSchema);



