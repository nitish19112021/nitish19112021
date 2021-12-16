const Joi = require("joi");
const joivalidate = Joi.object({
    name:Joi.string().min(3).max(20).required(),
     email:Joi.string().required().email(),
     password:Joi.string().required(),
     mobile:Joi.number().min(10).required()
})
module.exports = {
    joivalidate
}

