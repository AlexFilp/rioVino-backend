const express = require("express");
const { validateBody } = require("../utils");
const { registerSchema, loginSchema } = require("../schemas/usersSchemas");
const { register, login } = require("../controllers/userControllers");

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);

router.post("/login", validateBody(loginSchema), login);

module.exports = router;
