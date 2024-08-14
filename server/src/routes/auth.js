const express = require("express");
const router = express.Router();
const { loginUser, createUser } = require("../db/dbOperations");

router.post("/login_user", loginUser);
router.post("/create_user", createUser);

module.exports = router;
