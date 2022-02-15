require("dotenv").config();
const User = require("../model/userModel");
const errorMessage = require("../config/errorConfig");
const cryptoJS = require("crypto-js");

module.exports = {
  register: (userDetails) => {
    return new Promise((resolve, reject) => {
      User.findOne({ userEmail: userDetails.userEmail }, (err, data) => {
        if (userDetails && userDetails.userEmail) {
          if (err) {
            return reject({ status: 400, message: errorMessage.BAD_REQUEST });
          } else {
            if (data) {
              return reject({
                status: 400,
                message: errorMessage.RECORD_EXISTS,
              });
            } else {
              const user = new User({
                userName: userDetails.userName,
                userEmail: userDetails.userEmail,
                userPassword: cryptoJS.AES.encrypt(
                  userDetails.userPassword,
                  process.env.SEC_KEY
                ).toString(),
                roles:userDetails.roles,
                accessToken:'',
                refreshToken:''
              });
              user
                .save()
                .then((data) => {
                  console.log(data);
                  return resolve({
                    status: 200,
                    message: errorMessage.SUCCESS_MESSAGE,
                    data: data,
                  });
                })
                .catch((err) => {
                  console.log("error", err);
                  return reject({
                    status: 400,
                    message: errorMessage.BAD_REQUEST,
                  });
                });
            }
          }
        }
      });
    });
  },
  login: (userDetails) => {
    return new Promise((resolve, reject) => {
      User.findOne({ userName: userDetails.userName }, (err, data) => {
        if (err) {
          return reject({ status: 400, message: "user not found" });
        } else {
          const hashPass = cryptoJS.AES.decrypt(
            data.userPassword,
            process.env.SEC_KEY
          ).toString(cryptoJS.enc.Utf8);
          if (hashPass === userDetails.userPassword) {
            return resolve({ status: 200, message: "login successfully" });
          }
        }
      });
    });
  },
};
