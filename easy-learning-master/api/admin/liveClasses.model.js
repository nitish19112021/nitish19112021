
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LiveClassSchema = new Schema({
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
    role: {
        type: String
    },
    creationDate: { type: Date, default: Date.now },
    updationDate: { type: Date, default: Date.now },
});

// Export the model
module.exports = mongoose.model('Student', StudentSchema);
