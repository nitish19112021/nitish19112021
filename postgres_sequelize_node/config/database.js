const Sequelize = require("sequelize");
const dbConfig = require("./config")

//connection to database
const sequelize = new Sequelize(dbConfig.DB, dbConfig.user, dbConfig.password, {
    host: 'localhost',
    dialect: 'postgres',  
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
});
// check connection is establish or not
sequelize.authenticate().then(()=>{
  console.log("database connected..")
}).catch((err) => err && console.log(err));

//create object

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require('../model/user')(sequelize, Sequelize);

module.exports = db;