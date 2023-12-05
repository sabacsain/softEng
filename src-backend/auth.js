// auth.js
const express = require("express");
const router = express.Router();
const db = require("./db");

// Route for user login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error("Login failed:", err);
      res.status(500).json({ message: "Login failed" });
    } else if (results.length > 0) {
      res.json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
});

// Route for user signup
router.post("/signup", (req, res) => {
  const { username, password } = req.body;

  // Check if the username already exists
  const checkUserQuery = "SELECT * FROM users WHERE username = ?";
  db.query(checkUserQuery, [username], (checkUserError, userResults) => {
    if (checkUserError) {
      console.error("Signup failed:", checkUserError);
      res.status(500).json({ message: "Signup failed" });
    } else if (userResults.length > 0) {
      res.status(400).json({ message: "Username already exists" });
    } else {
      // If the username doesn't exist, insert the new user
      const insertUserQuery = "INSERT INTO users (username, password) VALUES (?, ?)";
      db.query(insertUserQuery, [username, password], (insertError) => {
        if (insertError) {
          console.error("Signup failed:", insertError);
          res.status(500).json({ message: "Signup failed" });
        } else {
          res.json({ message: "Signup successful" });
        }
      });
    }
  });
});

module.exports = router;
