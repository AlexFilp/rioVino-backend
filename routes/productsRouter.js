const express = require("express");
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getTotalProductsCount,
  getTotalProductsCountByType,
  getTotalProductsVinosCountBySubType,
  getTotalProductsEspumososCountBySubType,
  getTotalProductsDestiladosCountBySubType,
  getHoldedProducts,
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
    upload.array("images", 2),
    validateBody(productsValidationSchema),
    addProduct
  );

router.route("/holded").get(getHoldedProducts);

router.route("/total").get(getTotalProductsCount);
router.route("/total/types").get(getTotalProductsCountByType);
router.route("/total/vinos").get(getTotalProductsVinosCountBySubType);
router.route("/total/espumosos").get(getTotalProductsEspumososCountBySubType);
router.route("/total/destilados").get(getTotalProductsDestiladosCountBySubType);

router
  .route("/:id")
  .get(isValidId, getProductById)
  .patch(
    isValidId,
    upload.array("images", 2),
    validateBody(updateProjectValidationSchema),
    updateProduct
  )
  .delete(isValidId, deleteProduct);

module.exports = router;
