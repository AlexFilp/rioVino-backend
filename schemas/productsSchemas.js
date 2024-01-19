const Joi = require("joi");

const productsValidationSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Please provide a title for the product.",
  }),
  type: Joi.string().required().messages({
    "any.required": "Please specify the type of the product.",
  }),
  subType: Joi.string().required().messages({
    "any.required": "Please specify the subType of the product.",
  }),
  alcohol: Joi.string().required().messages({
    "any.required": "Please provide the alcohol content of the product.",
  }),
  price: Joi.string().required().messages({
    "any.required": "Please specify the price of the product.",
  }),
  discount: Joi.string(),
  capacity: Joi.string().required().messages({
    "any.required": "Please specify the capacity of the product.",
  }),
  iva: Joi.boolean(),
});

const updateProjectValidationSchema = Joi.object({
  title: Joi.string(),
  type: Joi.string(),
  subType: Joi.string(),
  alcohol: Joi.string(),
  price: Joi.string(),
  discount: Joi.string(),
  capacity: Joi.string(),
  iva: Joi.boolean(),
}).min(1);

module.exports = {
  productsValidationSchema,
  updateProjectValidationSchema,
};
