const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const BOOKINGS_FILE = path.join(__dirname, "../data/bookings.json");

/* ================= ADD BOOKING ================= */

router.post("/", (req, res) => {
  const booking = req.body;

  let bookings = [];

  if (fs.existsSync(BOOKINGS_FILE)) {
    const data = fs.readFileSync(BOOKINGS_FILE, "utf-8");
    bookings = JSON.parse(data);
  }

  bookings.push(booking);

  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));

  res.json({
    message: "Booking saved successfully",
    booking
  });
});

/* ================= GET BOOKINGS ================= */

router.get("/", (req, res) => {
  try {
    const data = fs.readFileSync(BOOKINGS_FILE, "utf-8");
    const bookings = JSON.parse(data);

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error reading bookings" });
  }
});

module.exports = router;