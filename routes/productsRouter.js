const express = require("express");
const { getProducts } = require("../controllers/productControllers");

const { validateBody } = require("../utils");
const {
  productsValidationSchema,
  updateProjectValidationSchema,
} = require("../schemas/productsSchemas");

const router = express.Router();

router.route("/").get(getProducts);

module.exports = router;
