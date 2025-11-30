const jwt = require("jsonwebtoken");
const User = require("../Models/Users");

const ensureAuthenticated = async (req, res, next) => {
  const token = req.cookies.token; // <= read token from cookie

  if (!token) {
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // get full user from DB
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT token wrong or expired" });
  }
};

module.exports = ensureAuthenticated;
