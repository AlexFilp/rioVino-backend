const { HttpError, controllerWrapper } = require("../utils");
const Product = require("../models/products");

const getProducts = controllerWrapper(async (req, res) => {
  const products = await Product.find();
  res.status(201).json(products);
});

module.exports = {
  getProducts,
};
