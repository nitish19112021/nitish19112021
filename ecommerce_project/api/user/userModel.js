//signup for user
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const productModel = require('../product/productModel');


const Schema = mongoose.Schema;
const userSchema = new Schema({    
    name:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:String,
    mobile:Number,
    isAdmin:{
        type:Boolean,
        default:false
    },  
        items:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"productdetail"
        }]      
},
{timestamps:true}
)

//bcrypt the password when saving into database

userSchema.pre('save', async function (next){
    // console.log(this.password)
     const salt =await bcrypt.genSalt(10);
     const hashpassword =await bcrypt.hash(this.password,salt)
     this.password = hashpassword;
     next()
})


module.exports = mongoose.model('userdata',userSchema)
 