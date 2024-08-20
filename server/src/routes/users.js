const express = require("express");
const router = express.Router();

const { logoutUser, getUserInfo } = require("../db/dbOperations");
const validateCookie = require("../utils/cookieUtils");

router.post("/logout", validateCookie, logoutUser);
router.get("/info", validateCookie, getUserInfo);

module.exports = router;
