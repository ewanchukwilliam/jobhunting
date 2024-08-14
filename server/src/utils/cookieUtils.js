const jwt = require("jsonwebtoken");
const db = require("../db/db");
const dotenv = require("dotenv");
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const validateCookie = (req, res, next) => {
  const cookie = req.cookies.jwt;
  if (!cookie) {
    return res.status(401).json({ message: "No cookie provided" });
  }
  try {
    const decoded = jwt.verify(cookie, SECRET_KEY);
    const sql = "SELECT username, email, unique_id FROM users WHERE username = ?";
		db.promise().query(sql, [decoded.username])
      .then(([results]) => {
        if (results.length === 0) {
          return res
            .status(404)
            .json({ message: "No user found with the provided token" });
        }
        req.user = results[0]; // Attach user to request object
        next(); // Proceed to next middleware/route handler
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: err.message });
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = validateCookie;
