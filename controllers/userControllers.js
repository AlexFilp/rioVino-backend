const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { HttpError, controllerWrapper, asignTokens } = require("../utils");

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

const login = controllerWrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new HttpError(401, "Email or password invalid");
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new HttpError(401, "Email or password invalid");
  }

  const { accessToken, refreshToken } = asignTokens(user);

  await User.findByIdAndUpdate(user._id, { refreshToken });

  res.json({
    accessToken,
    user: {
      email: user.email,
      firstname: user.firstname,
      surname: user.surname,
      userType: user.userType,
      cart: user.cart,
    },
  });
});

const getCurrent = controllerWrapper(async (req, res) => {
  const { email, firstname, surname, userType, cart } = req.user;
  res.json({ user: { email, firstname, surname, userType, cart } });
});

const logout = controllerWrapper(async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { refreshToken: null });
  res.status(200).json({ message: "logout successfull" });
});

module.exports = {
  register,
  login,
  getCurrent,
  logout,
};
