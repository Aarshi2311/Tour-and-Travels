const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const BOOKINGS_FILE = path.join(__dirname, "../data/bookings.json");

/* ================= ADD BOOKING ================= */

router.post("/", (req, res) => {
  const booking = { id: Date.now(), ...req.body };

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

/* ================= DELETE BOOKING ================= */

router.delete("/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = fs.readFileSync(BOOKINGS_FILE, "utf-8");
    let bookings = JSON.parse(data);
    const index = bookings.findIndex((b) => b.id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Booking not found" });
    }
    bookings.splice(index, 1);
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
    res.json({ message: "Booking removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error removing booking" });
  }
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