const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  changePassword,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");

// Authentication
router.post("/register", registerUser);
router.post("/login", loginUser);

// Profile
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

// Change Password
router.put("/change-password", protect, changePassword);

module.exports = router;