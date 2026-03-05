const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const PACKAGES_FILE = path.join(__dirname, "../data/packages.json");

/* ================= GET PACKAGES ================= */

router.get("/", (req, res) => {
  try {
    const data = fs.readFileSync(PACKAGES_FILE, "utf-8");
    const packages = JSON.parse(data);

    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: "Error reading packages" });
  }
});

module.exports = router;