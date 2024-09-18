const {
  HttpError,
  controllerWrapper,
  uploadProductImageToCloudinary,
  removeProductImageFromCloudinary,
} = require("../utils");
const fs = require("fs/promises");
const Product = require("../models/product");
const {
  getTypes,
  getVinosTypes,
  getEspumososTypes,
  getDestiladosTypes,
} = require("../services/productsServices");

const getProducts = controllerWrapper(async (req, res) => {
  const { page = 1, limit = 20, subType } = req.query;
  const skip = (page - 1) * limit;

  let totalProducts = 0;

  const filter = {};

  let upperSubType = null;

  if (subType) {
    filter.subType = subType;
    upperSubType = subType.charAt(0).toUpperCase() + subType.slice(1);
    totalProducts = await Product.countDocuments({ subType });
  } else {
    totalProducts = await Product.countDocuments({});
  }

  const products = await Product.find(filter, "-createdAt -updatedAt", {
    skip,
    limit,
  });
  res.status(201).json({ products, totalProducts, subType: upperSubType });
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
    const fileData = await uploadProductImageToCloudinary(tempUpload);

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
    const fileData = await uploadProductImageToCloudinary(tempUpload);
    imageURL = fileData.url;
    imageID = fileData.public_id;

    await fs.unlink(tempUpload);

    if (productToUpdate.imageID !== "") {
      await removeProductImageFromCloudinary(productToUpdate.imageID);
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

const getTotalProductsCount = controllerWrapper(async (req, res) => {
  const totalProducts = await Product.countDocuments({});

  res.status(201).json({ totalProducts });
});

const getTotalProductsCountByType = controllerWrapper(async (req, res) => {
  const types = await getTypes();

  res.status(201).json(types);
});

const getTotalProductsVinosCountBySubType = controllerWrapper(
  async (req, res) => {
    const vinosTypes = await getVinosTypes();

    res.status(201).json(vinosTypes);
  }
);

const getTotalProductsEspumososCountBySubType = controllerWrapper(
  async (req, res) => {
    const espumososTypes = await getEspumososTypes();

    res.status(201).json(espumososTypes);
  }
);

const getTotalProductsDestiladosCountBySubType = controllerWrapper(
  async (req, res) => {
    const destiladosTypes = await getDestiladosTypes();

    res.status(201).json(destiladosTypes);
  }
);

module.exports = {
  getProducts,
  getTotalProductsCount,
  getTotalProductsCountByType,
  getTotalProductsVinosCountBySubType,
  getTotalProductsEspumososCountBySubType,
  getTotalProductsDestiladosCountBySubType,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
