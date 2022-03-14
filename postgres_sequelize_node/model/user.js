const DataTypes = require("sequelize").DataTypes
const bcrypt = require('bcrypt')
module.exports = (sequelize, Sequelize) => {
const userModel = sequelize.define('users',{
    userId:{
        primaryKey: true,
        type:Sequelize.UUID,
        defaultValue:DataTypes.UUIDV4,
    },
    username:{type:Sequelize.STRING},
    password:{type:Sequelize.STRING},
    email:{type:Sequelize.STRING},
    createdAt : {type : Sequelize.DATE, defaultValue: Sequelize.NOW},
    updatedAt : {type : Sequelize.DATE, defaultValue: Sequelize.NOW}  
 },

// {
//  hooks: {
//   beforeCreate: async (user) => {
//    if (user.password) {
//     const salt = await bcrypt.genSalt(10, 'a');
//     user.password = bcrypt.hash(user.password, salt);
//    }
//   },
//   beforeUpdate:async (user) => {
//    if (user.password) {
//     const salt = await bcrypt.genSalt(10, 'a');
//     user.password = bcrypt.hash(user.password, salt);
//    }
//   }
//  },
//  instanceMethods: {
//   validPassword: (password) => {
//    return bcrypt.compare(password, this.password);
//   }
//  }
// }
 );    
//     // return userModel;
//     userModel.prototype.validPassword = async (password, hash) => {
//         return await bcrypt.compare(password, hash);
//        }
        return userModel;
};


   
