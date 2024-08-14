const express = require("express");
const router = express.Router();

const { logoutUser } = require("../db/dbOperations");
const validateCookie = require("../utils/cookieUtils");

router.post("/logout", validateCookie, logoutUser);

module.exports = router;
