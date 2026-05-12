const Review = require("../models/Review");
const User = require("../models/User");

// CREATE REVIEW
exports.createReview = async (req, res) => {
  try {
    const { packageId, packageName, rating, title, description } = req.body;
    const userId = req.user.userId;

    if (!rating || !title || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    // Get user details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create review
    const newReview = new Review({
      userId,
      userName: user.name,
      userProfilePic: user.profilePic,
      packageId,
      packageName,
      rating,
      title,
      description,
    });

    await newReview.save();

    res.status(201).json({
      message: "Review created successfully",
      review: newReview,
    });
  } catch (error) {
    console.error("Create review error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL REVIEWS
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("userId", "name profilePic");
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Get reviews error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET REVIEWS FOR A PACKAGE
exports.getReviewsByPackage = async (req, res) => {
  try {
    const { packageId } = req.params;
    const reviews = await Review.find({ packageId }).populate(
      "userId",
      "name profilePic"
    );
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Get package reviews error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET USER REVIEWS
exports.getUserReviews = async (req, res) => {
  try {
    const userId = req.user.userId;
    const reviews = await Review.find({ userId });
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Get user reviews error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE REVIEW
exports.updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, title, description } = req.body;
    const userId = req.user.userId;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Check if user owns this review
    if (review.userId.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to update this review" });
    }

    review.rating = rating || review.rating;
    review.title = title || review.title;
    review.description = description || review.description;

    await review.save();

    res.status(200).json({
      message: "Review updated successfully",
      review,
    });
  } catch (error) {
    console.error("Update review error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE REVIEW
exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.userId;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Check if user owns this review
    if (review.userId.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this review" });
    }

    await Review.findByIdAndDelete(reviewId);

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Delete review error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
