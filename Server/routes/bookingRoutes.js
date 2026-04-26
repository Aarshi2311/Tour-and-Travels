const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createBooking,
  getBookings,
  getAllBookings,
  deleteBooking,
  updateBookingStatus,
} = require("../controllers/bookingController");

// Public routes
router.get("/", getAllBookings);

// Protected routes
router.post("/", authMiddleware, createBooking);
router.get("/user", authMiddleware, getBookings);
router.delete("/:bookingId", authMiddleware, deleteBooking);
router.put("/:bookingId/status", authMiddleware, updateBookingStatus);

module.exports = router;