const {
  HttpError,
  controllerWrapper,
  uploadToCloudinary,
} = require("../utils");
const fs = require("fs/promises");
const Product = require("../models/product");
const { removeFromCloudinary } = require("../utils/cloudinary");

const getProducts = controllerWrapper(async (req, res) => {
  const { page, limit, subType } = req.query;
  const skip = (page - 1) * limit;

  const filter = {};

  if (subType) {
    filter.subType = subType;
  }

  const products = await Product.find(filter, "-createdAt -updatedAt", {
    skip,
    limit,
  });
  res.status(201).json(products);
});

const getProductById = controllerWrapper(async (req, res) => {
  const { id } = req.params;

  const productById = await Product.findOne(
    { _id: id },
    "-createdAt -updatedAt"
  );

  if (!productById) {
    throw new HttpError(404, "Product not found");
  }
  res.status(200).json(productById);
});

const addProduct = controllerWrapper(async (req, res) => {
  let imageURL = "";
  let imageID = "";

  if (req.file) {
    const { path: tempUpload } = req.file;
    const fileData = await uploadToCloudinary(tempUpload);

    imageURL = fileData.url;
    imageID = fileData.public_id;

    await fs.unlink(tempUpload);
  }
  const newProduct = await Product.create({ ...req.body, imageURL, imageID });

  res.status(201).json(newProduct);
});

const updateProduct = controllerWrapper(async (req, res) => {
  const { id } = req.params;

  const productToUpdate = await Product.findOne({ _id: id });

  if (!productToUpdate) {
    throw new HttpError(404, "Product not found");
  }

  console.log("productToUpdate", productToUpdate);
  let imageURL = productToUpdate.imageURL;
  let imageID = productToUpdate.imageID;

  if (req.file) {
    const { path: tempUpload } = req.file;
    const fileData = await uploadToCloudinary(tempUpload);
    imageURL = fileData.url;
    imageID = fileData.public_id;

    await fs.unlink(tempUpload);

    if (productToUpdate.imageID !== "") {
      await removeFromCloudinary(productToUpdate.imageID);
    }
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id },
    { ...req.body, imageID, imageURL },

    {
      new: true,
    }
  );
  res.status(200).json(updatedProduct);
});

const deleteProduct = controllerWrapper(async (req, res) => {
  const { id } = req.params;

  const productToDelete = await Product.findOneAndDelete({ _id: id });

  if (!productToDelete) {
    throw new HttpError(404, "Product not found");
  }
  if (productToDelete.imageID !== "") {
    await removeFromCloudinary(productToDelete.imageID);
  }
  res.status(200).json({ message: `Product with id ${id} deleted` });
});

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
