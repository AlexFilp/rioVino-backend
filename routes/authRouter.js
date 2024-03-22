const express = require("express");
const { validateBody } = require("../utils");
const { registerSchema, loginSchema } = require("../schemas/usersSchemas");
const {
  register,
  login,
  getCurrent,
  logout,
} = require("../controllers/userControllers");
const { authenticate } = require("../middlewares");

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);

router.post("/login", validateBody(loginSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

module.exports = router;
