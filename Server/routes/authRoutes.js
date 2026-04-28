const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middleware/authMiddleware");
const { signup, login, googleLogin, getUserProfile, uploadProfilePic, removeProfilePic } = require("../controllers/authControllers");

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Only image files are allowed");
    }
  },
});

// Auth routes
router.post("/signup", upload.single("profilePic"), signup);
router.post("/login", login);
router.post("/google-login", googleLogin);
router.get("/profile", authMiddleware, getUserProfile);
router.post("/upload-profile-pic", authMiddleware, upload.single("profilePic"), uploadProfilePic);
router.delete("/remove-profile-pic", authMiddleware, removeProfilePic);

module.exports = router;