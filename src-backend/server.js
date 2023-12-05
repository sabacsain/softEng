// server.js
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./auth");
const db = require("./db");

const app = express();
const PORT = 3002;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
