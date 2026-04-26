const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createReview,
  getAllReviews,
  getReviewsByPackage,
  getUserReviews,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

// Public routes
router.get("/", getAllReviews);
router.get("/package/:packageId", getReviewsByPackage);

// Protected routes
router.post("/", authMiddleware, createReview);
router.get("/user", authMiddleware, getUserReviews);
router.put("/:reviewId", authMiddleware, updateReview);
router.delete("/:reviewId", authMiddleware, deleteReview);

module.exports = router;