const express = require("express");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const packageRoutes = require("./routes/packagesRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const logger = require("./middleware/logger");
const cors = require("cors");

const app = express();
const PORT = 3000;
// const HOST = "127.0.0.1";

/* ================= Middleware ================= */

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (if needed later)
app.use(express.static(path.join(__dirname, "public")));

app.use(logger); // Custom logger middleware

// CORS configuration
app.use(cors());
/* ================= Routes ================= */

app.use("/api/auth", authRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);

/* ================= Home Test Route ================= */

app.get("/", (req, res) => {
  res.send("Elite Escapes Backend Running...");
});

/* ================= 404 Handler ================= */

app.use((req, res) => {
  res.status(404).send("404 - Route Not Found");
});

/* ================= Start Server ================= */

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});