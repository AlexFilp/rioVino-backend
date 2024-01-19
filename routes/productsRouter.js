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

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(validateBody(productsValidationSchema), addProduct);

router
  .route("/:id")
  .patch(validateBody(updateProjectValidationSchema), updateProduct);

module.exports = router;
