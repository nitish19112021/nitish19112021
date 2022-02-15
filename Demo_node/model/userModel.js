const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type:String
    },
    userEmail:{
        type:String
    },
    userPassword:{
        type:String
    },
    roles:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Role'
        }
    ],
    accessToken:{
        type:String,
    },
    refreshToken:{
        type:String
    }
})

module.exports = mongoose.model('DemoUserTable', userSchema);