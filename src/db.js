// db.js
import { createConnection } from "mysql2";

const db = createConnection({
  host: "localhost",
  user: "phpmyadmin", // Replace with your database username
  password: "admin", // Replace with your database password
  database: "foodwastedb", // Replace with your database name
  port: 3306, // Replace with your MySQL server port if it's not the default 3306
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    if (err.code === 'ECONNREFUSED') {
      console.error("Is your MySQL server running?");
    }
  } else {
    console.log("Connected to the database");
  }
});

export default db;
