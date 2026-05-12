const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/authMiddleware");
const { signup, login, googleLogin, getUserProfile, uploadProfilePic, removeProfilePic } = require("../controllers/authControllers");

// Auth routes
router.post("/signup", upload.single("profilePic"), signup);
router.post("/login", login);
router.post("/google-login", googleLogin);
router.get("/profile", authMiddleware, getUserProfile);
router.post("/upload-profile-pic", authMiddleware, upload.single("profilePic"), uploadProfilePic);
router.delete("/remove-profile-pic", authMiddleware, removeProfilePic);

module.exports = router;
