const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is a required field",
    "string.pattern.base": "Incorrect type of email",
    "string.empty": "Email is not allowed to be empty",
  }),
  name: Joi.string().min(2).max(10).required().messages({
    "any.required": "Name is a required field",
    "string.min": "Name must be at least 2 characters long",
    "string.max": "Name must be at most 10 characters long",
    "string.empty": "Name is not allowed to be empty",
    "string.pattern.base": "Incorrect type of name",
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "Password is a required field",
    "string.min": "Password length must be at least {{#limit}} characters long",
    "string.empty": "Password is not allowed to be empty",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is a required field",
    "string.pattern.base": "Incorrect type of email",
    "string.empty": "Email is not allowed to be empty",
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "Password is a required field",
    "string.min": "Password length must be at least {{#limit}} characters long",
    "string.empty": "Password is not allowed to be empty",
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
