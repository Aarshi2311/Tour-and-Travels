const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
} = require("../controllers/packageController");

// Public routes
router.get("/", getAllPackages);
router.get("/:packageId", getPackageById);

// Admin routes (protected with auth)
router.post("/", authMiddleware, createPackage);
router.put("/:packageId", authMiddleware, updatePackage);
router.delete("/:packageId", authMiddleware, deletePackage);

module.exports = router;