// server.js
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./auth");
const db = require("./db").default;

const app = express();
const PORT = 3010;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
