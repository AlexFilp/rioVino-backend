const express = require("express");
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} = require("../controllers/productControllers");

const { validateBody } = require("../utils");
const {
  productsValidationSchema,
  updateProjectValidationSchema,
} = require("../schemas/productsSchemas");
const { upload, isValidId } = require("../middlewares");

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(
    upload.single("image"),
    validateBody(productsValidationSchema),
    addProduct
  );

router
  .route("/:id")
  .get(isValidId, getProductById)
  .patch(
    isValidId,
    upload.single("image"),
    validateBody(updateProjectValidationSchema),
    updateProduct
  )
  .delete(isValidId, deleteProduct);

module.exports = router;
