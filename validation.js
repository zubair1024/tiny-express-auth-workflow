const Joi = require("@hapi/joi");

//Register validation
const registerValidation = (data) => {
  const schema = {
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  };
  return new Joi.ValidationError(data, schema);
};

module.exports.registerValidation = registerValidation;

const loginValidation = (data) => {
  const schema = {
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  };
  return new Joi.ValidationError(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
