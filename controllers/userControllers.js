const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { HttpError, controllerWrapper } = require("../utils");

const register = controllerWrapper(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw new HttpError(409, "Email already in use");
  }

  const hashedPass = await bcrypt.hash(password, 10);

  const userToCreate = await User.create({ ...req.body, password: hashedPass });
  const newUser = userToCreate.toObject();
  delete newUser.password;
  delete newUser.createdAt;
  delete newUser.updatedAt;

  res.status(201).json({ user: newUser });
});

module.exports = {
  register,
};
