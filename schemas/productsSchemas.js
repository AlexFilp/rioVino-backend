const Joi = require("joi");

const productsValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Please provide a name for the product.",
  }),
  type: Joi.string().required().messages({
    "any.required": "Please specify the type of the product.",
  }),
  alcohol: Joi.string().required().messages({
    "any.required": "Please provide the alcohol content of the product.",
  }),
  price: Joi.string().required().messages({
    "any.required": "Please specify the price of the product.",
  }),
  sale: Joi.boolean(),
  discount: Joi.string(),
  capacity: Joi.string().required().messages({
    "any.required": "Please specify the capacity of the product.",
  }),
  iva: Joi.boolean(),
});

const updateProjectValidationSchema = Joi.object({
  name: Joi.string(),
  type: Joi.string(),
  alcohol: Joi.string(),
  price: Joi.string(),
  sale: Joi.boolean(),
  discount: Joi.string(),
  capacity: Joi.string(),
  iva: Joi.boolean(),
}).min(1);

module.exports = {
  productsValidationSchema,
  updateProjectValidationSchema,
};
