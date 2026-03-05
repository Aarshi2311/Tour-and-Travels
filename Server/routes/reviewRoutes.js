const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const REVIEWS_FILE = path.join(__dirname, "../data/reviews.json");

/* ================= ADD REVIEW ================= */

router.post("/", (req, res) => {
  const review = req.body;

  let reviews = [];

  if (fs.existsSync(REVIEWS_FILE)) {
    const data = fs.readFileSync(REVIEWS_FILE, "utf-8");
    reviews = JSON.parse(data);
  }

  reviews.push(review);

  fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2));

  res.json({
    message: "Review saved successfully",
    review
  });
});

/* ================= GET REVIEWS ================= */

router.get("/", (req, res) => {
  try {
    const data = fs.readFileSync(REVIEWS_FILE, "utf-8");
    const reviews = JSON.parse(data);

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error reading reviews" });
  }
});

module.exports = router;