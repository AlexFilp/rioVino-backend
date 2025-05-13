const axios = require("axios");
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

const { HOLDED_KEY } = process.env;

const holdedInstance = axios.create({
  baseURL: "https://api.holded.com/api/invoicing/v1",
  headers: {
    Accept: "application/json",
    Key: HOLDED_KEY,
  },
});

let lastImportTime = 0; // Stored outside the function
const MIN_INTERVAL = 3600 * 1000; // 1 hour

const getHoldedProducts = controllerWrapper(async (req, res) => {
  const now = Date.now();

  if (now - lastImportTime < MIN_INTERVAL) {
    console.log("TIME");
    return res.status(429).json({ message: "Please wait before trying again" });
  }

  const response = await holdedInstance.get("/products");
  const holdedProducts = response.data;

  if (!Array.isArray(holdedProducts)) {
    console.error("Unexpected response:", holdedProducts);
    return;
  }

  // let updatedCount = 0;

  // for (const product of holdedProducts) {
  //   const res = await Product.updateOne(
  //     { id: product.id }, // Match by Holded product ID
  //     { $set: product }, // Update with new data
  //     { upsert: true } // Insert if not exists
  //   );

  //   if (res.modifiedCount > 0 || res.upsertedCount > 0) {
  //     updatedCount++;
  //   }
  // }

  await Product.deleteMany({}); // Delete all existing
  await Product.insertMany(holdedProducts); // Insert fresh data

  lastImportTime = now; // Update the time only on success

  res.status(201).json({
    message: `✅ Replaced all with ${holdedProducts.length} products from Holded`,
  });
});

const getProducts = controllerWrapper(async (req, res) => {
  const { page = 1, limit = 20, subType } = req.query;
  const skip = (page - 1) * limit;

  console.log(subType);

  let totalProducts = 0;
  const filter = {};

  let upperSubType = null;

  if (subType) {
    filter.tags = { $in: [subType] }; // 🔁 Match tags that include the subType
    upperSubType = subType.charAt(0).toUpperCase() + subType.slice(1);
    totalProducts = await Product.countDocuments(filter);
  } else {
    totalProducts = await Product.countDocuments();
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
    { id: id },
    "-createdAt -updatedAt"
  );

  if (!productById) {
    throw new HttpError(404, "Product not found");
  }
  res.status(200).json(productById);
});

const addProduct = controllerWrapper(async (req, res) => {
  // if only 1 image
  // let imageURL = "";
  // let imageID = "";

  // if (req.file) {
  // const { path: tempUpload } = req.file;
  // const fileData = await uploadProductImageToCloudinary(tempUpload);
  // imageURL = fileData.url;
  // imageID = fileData.public_id;
  // await fs.unlink(tempUpload);
  // }
  // const newProduct = await Product.create({ ...req.body, imageURL, imageID });

  let uploadedProductImages;

  console.log("req.files", req.files);

  if (req.files && req.files.length > 0) {
    uploadedProductImages = await Promise.all(
      req.files.map(async (file) => {
        const { path: tempUpload } = file;

        const fileData = await uploadProductImageToCloudinary(tempUpload);

        const imageURL = fileData.url;
        const imageID = fileData.public_id;

        await fs.unlink(tempUpload);

        return { imageID, imageURL };
      })
    );

    const newProduct = await Product.create({
      ...req.body,
      productImages: [...uploadedProductImages],
    });

    res.status(201).json(newProduct);
  } else {
    const newProduct = await Product.create({
      ...req.body,
    });

    res.status(201).json(newProduct);
  }
});

const updateProduct = controllerWrapper(async (req, res) => {
  const { id } = req.params;

  const productToUpdate = await Product.findOne({ _id: id });

  if (!productToUpdate) {
    throw new HttpError(404, "Product not found");
  }

  // let imageURL = productToUpdate.imageURL;
  // let imageID = productToUpdate.imageID;

  let uploadedProductImages;

  if (req.files && req.files.length > 0) {
    uploadedProductImages = await Promise.all(
      req.files.map(async (file) => {
        const { path: tempUpload } = file;

        const fileData = await uploadProductImageToCloudinary(tempUpload);

        const imageURL = fileData.url;
        const imageID = fileData.public_id;

        await fs.unlink(tempUpload);

        return { imageID, imageURL };
      })
    );

    if (productToUpdate.productImages.length > 0) {
      productToUpdate.productImages.map(async (image) => {
        await removeProductImageFromCloudinary(image.imageID);
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: id },
      { ...req.body, productImages: [...uploadedProductImages] },

      {
        new: true,
      }
    );
    res.status(200).json(updatedProduct);

    // if only 1 image
    // const { path: tempUpload } = req.file;
    // const fileData = await uploadProductImageToCloudinary(tempUpload);
    // imageURL = fileData.url;
    // imageID = fileData.public_id;

    // await fs.unlink(tempUpload);

    // if (productToUpdate.imageID !== "") {
    //   await removeProductImageFromCloudinary(productToUpdate.imageID);
    // }
  } else {
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: id },
      { ...req.body },

      {
        new: true,
      }
    );
    res.status(200).json(updatedProduct);
  }
});

const deleteProduct = controllerWrapper(async (req, res) => {
  const { id } = req.params;

  const productToDelete = await Product.findOneAndDelete({ _id: id });

  if (!productToDelete) {
    throw new HttpError(404, "Product not found");
  }

  if (productToDelete.productImages.length > 0) {
    productToDelete.productImages.map(async (image) => {
      await removeProductImageFromCloudinary(image.imageID);
    });
  }

  // if only 1 image
  // if (productToDelete.imageID !== "") {
  //   await removeProductImageFromCloudinary(productToDelete.imageID);
  // }

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
  getHoldedProducts,
};
