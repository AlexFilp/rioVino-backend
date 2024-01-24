const express = require("express");
const {
  getProducts,
  addProduct,
  updateProduct,
} = require("../controllers/productControllers");

const { validateBody } = require("../utils");
const {
  productsValidationSchema,
  updateProjectValidationSchema,
} = require("../schemas/productsSchemas");
const { upload } = require("../middlewares");

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
  .patch(
    upload.single("image"),
    validateBody(updateProjectValidationSchema),
    updateProduct
  );

module.exports = router;
