// db.js
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Replace with your database username
  password: "password", // Replace with your database password
  database: "your_database", // Replace with your database name
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to the database");
  }
});

module.exports = db;
