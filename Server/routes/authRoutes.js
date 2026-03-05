const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const USERS_FILE = path.join(__dirname, "../data/users.json");

/* ================= SIGNUP ================= */

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  let users = [];

  if (fs.existsSync(USERS_FILE)) {
    const data = fs.readFileSync(USERS_FILE, "utf-8");
    users = JSON.parse(data);
  }

  const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
  };

  users.push(newUser);

  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

  res.json({ message: "Signup successful", user: newUser });
});

/* ================= LOGIN ================= */

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const data = fs.readFileSync(USERS_FILE, "utf-8");
  const users = JSON.parse(data);

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.json({
    message: "Login successful",
    user,
  });
});

module.exports = router;