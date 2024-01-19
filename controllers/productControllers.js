const { HttpError, controllerWrapper } = require("../utils");
const Product = require("../models/products");

const getProducts = controllerWrapper(async (req, res) => {
  const products = await Product.find();
  res.status(201).json(products);
});

const addProduct = controllerWrapper(async (req, res) => {
  const newProduct = await Product.create(req.body);

  res.status(201).json(newProduct);
});

const updateProduct = controllerWrapper(async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  console.log(req.file);

  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedProduct) {
    throw new HttpError(404, "Product not found");
  }
  res.status(200).json(updatedProduct);
});

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
};
