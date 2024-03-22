const jwt = require("jsonwebtoken");
const { HttpError, asignTokens } = require("../utils");
const User = require("../models/user");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(new HttpError(401, "Invalid token"));
  }

  let user;
  try {
    const decodedToken = jwt.decode(token);
    user = await User.findById(decodedToken.id);
    if (!user || !user.refreshToken) {
      return next(new HttpError(401, "User is not found or invalid token"));
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET);

    req.user = user;
    next();
  } catch (error) {
    if (error === "TokenExpiredError") {
      return next(HttpError(401, error.message));
    }
    try {
      jwt.verify(user.refreshToken, REFRESH_TOKEN_SECRET);

      const { accessToken, refreshToken } = asignTokens(user);
      await User.findByIdAndUpdate(user._id, refreshToken);

      res.status(200).json({
        accessToken,
        user: {
          _id: user._id,
          email: user.email,
          firstname: user.firstname,
          surname: user.surname,
          userType: user.userType,
          cart: user.cart,
        },
      });
    } catch (error) {
      next(new HttpError(401, "Refresh token is expired"));
    }
  }
};

module.exports = authenticate;
