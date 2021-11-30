
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    name: {
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
    password: {
        type: String,
        required: true
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
module.exports = mongoose.model('Admin', AdminSchema);
