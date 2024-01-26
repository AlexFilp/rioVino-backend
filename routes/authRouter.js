const express = require("express");
const { validateBody } = require("../utils");
const { registerSchema, loginSchema } = require("../schemas/usersSchemas");
const { register } = require("../controllers/userControllers");

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);

module.exports = router;
