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

  const { accessToken, refreshToken } = asignTokens(userToCreate);

  const newUser = await User.findByIdAndUpdate(
    userToCreate._id,
    { refreshToken, accessToken },
    {
      new: true,
      select: "-createdAt -updatedAt  -password -refreshToken",
    }
  );

  res.status(201).json({
    accessToken,
    user: {
      email: newUser.email,
      name: newUser.name,
      surname: newUser.surname,
      userType: newUser.userType,
      cart: newUser.cart,
    },
  });
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

  await User.findByIdAndUpdate(user._id, { refreshToken, accessToken });

  res.json({
    accessToken,
    user: {
      email: user.email,
      name: user.name,
      surname: user.surname,
      userType: user.userType,
      cart: user.cart,
    },
  });
});

const getCurrent = controllerWrapper(async (req, res) => {
  const { email, name, surname, userType, cart, accessToken } = req.user;
  console.log("req.user", req.user);
  res.json({
    accessToken,
    user: { email, name, surname, userType, cart },
  });
});

const logout = controllerWrapper(async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { refreshToken: null });
  res.status(200).json({ message: "logout successfull" });
});

const addToCart = controllerWrapper(async (req, res) => {
  const { _id } = req.user;
  const { product, quantity } = req.body;

  const user = await User.findById(_id);

  if (!user) {
    throw HttpError(404, "User not found");
  }

  const existingProduct = user.cart.find(
    (item) => item.product.id === product.id
  );

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    user.cart.push({ product, quantity });
  }

  await user.save();

  res.status(200).json(user.cart);
});

const updateCartQuantity = controllerWrapper(async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity < 1) {
    return res.status(400).json({ message: "Quantity must be at least 1" });
  }

  const user = await User.findById(_id);

  if (!user) {
    throw HttpError(404, "User not found");
  }

  const cartItem = user.cart.find((item) => item.product.id === id);
  console.log(cartItem);

  cartItem.quantity = quantity;

  await user.save();

  res.status(200).json(user.cart);
});

const removeFromCart = controllerWrapper(async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;

  console.log("id", id);

  const user = await User.findById(_id);

  if (!user) {
    throw HttpError(404, "User not found");
  }

  user.cart = user.cart.filter((item) => item.product.id !== id);

  await user.save();

  res.status(200).json(user.cart);
});

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  addToCart,
  updateCartQuantity,
  removeFromCart,
};
