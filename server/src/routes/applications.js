const express = require("express");
const router = express.Router();
const {
  addApplication,
  getApplications,
  deleteApplication,
  editUser,
  getApplicationId,
  getStats,
  getPostings,
  refreshUser,
  getCookie,
} = require("../db/dbOperations.js");
const validateCookie = require("../utils/cookieUtils.js");

router.post("/add_application", validateCookie, addApplication);
router.get("/applications", validateCookie, getApplications);
router.delete("/delete/:id", validateCookie, deleteApplication);

router.get("/refresh_user", validateCookie, refreshUser);
router.post("/edit_user/:id", validateCookie, editUser);
router.get("/get_applications/:id", validateCookie, getApplicationId);
router.get("/applications/stats", validateCookie, getStats);
router.get("/postings", getPostings);
router.get("/cookietester", validateCookie, getCookie);

module.exports = router;
