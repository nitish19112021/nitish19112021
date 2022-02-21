const DataTypes = require("sequelize").DataTypes

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
});
    return userModel;
};
