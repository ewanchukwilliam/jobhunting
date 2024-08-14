const validateCookie = require("../utils/cookieUtils");

const authMiddleware = async (req, res, next) => {
  try {
    const userData = await validateCookie(req, res, next);
    console.log(userData);
    req.user = userData; // Attach user data to the request object
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { authMiddleware };
