
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    mobileNo: {
        type: Number
    },
    name: {
        type: String
    },
    board: {
        type: String
    },
    class: {
        type: String
    },
    email: {
        type: String,
    },
    gender: {
        type: String,
    },
    city: {
        type: String
    },
    status: {
        type: String
    },

    subscriptions: [{
        teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
        expireOn: { type: String }
    }],
    role: {
        type: String
    },
    creationDate: { type: Date, default: Date.now },
    updationDate: { type: Date, default: Date.now },
});

// Export the model
module.exports = mongoose.model('Student', StudentSchema);
