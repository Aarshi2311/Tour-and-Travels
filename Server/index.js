require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const { execSync } = require("child_process");

const connectDB = require("./config/db");
const seedPackages = require("./seeds/seedPackages");

// Routes
const authRoutes = require("./routes/authRoutes");
const packageRoutes = require("./routes/packageRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

// Middleware
const logger = require("./middleware/logger");

const app = express();
const PORT = process.env.PORT || 3000;

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

/* ================= DB ================= */
const initializeDB = async () => {
  try {
    await connectDB();
    await seedPackages();
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

initializeDB();

/* ================= Middleware ================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logger);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= Routes ================= */
app.use("/api/auth", authRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);

/* ================= Test Route ================= */
app.get("/", (req, res) => {
  res.send("Elite Escapes Backend Running...");
});

/* ================= 404 ================= */
app.use((req, res) => {
  res.status(404).send("404 - Route Not Found");
});

/* ================= Error Handler ================= */
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ message: "Internal server error" });
});

/* ================= Server ================= */
const server = app.listen(PORT, () => {
  console.log(`✓ Server running at http://localhost:${PORT}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    try {
      execSync(
        `Get-NetTCPConnection -LocalPort ${PORT} -State Listen | Select-Object -ExpandProperty OwningProcess | ForEach-Object { Stop-Process -Id $_ -Force }`,
        { shell: "powershell.exe", stdio: "ignore" }
      );
    } catch (e) {}
    server.listen(PORT);
  } else {
    console.error("Server error:", err);
    process.exit(1);
  }
});