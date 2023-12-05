// auth.js
const express = require("express");
const router = express.Router();
const AuthService = require("./AuthService");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await AuthService.login(username, password);
    // You may generate a JWT token here and send it as the response
    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(401).json({ message: "Login failed", error: error.message });
  }
});

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userId = await AuthService.signup(username, password);
    res.json({ message: "Signup successful", userId });
  } catch (error) {
    res.status(400).json({ message: "Signup failed", error: error.message });
  }
});

module.exports = router;
