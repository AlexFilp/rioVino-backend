const express = require("express");
const { validateBody } = require("../utils");
const { registerSchema, loginSchema } = require("../schemas/usersSchemas");
const {
  register,
  login,
  getCurrent,
  logout,
  addToCart,
  removeFromCart,
} = require("../controllers/userControllers");
const { authenticate, isValidId } = require("../middlewares");

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);

router.post("/login", validateBody(loginSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch("/cart", authenticate, addToCart);

router.delete("/cart/:id", authenticate, isValidId, removeFromCart);

module.exports = router;
