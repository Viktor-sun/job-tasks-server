const mongoose = require("mongoose");

const db = mongoose.connect("mongodb://localhost/todos_db");

mongoose.connection.on("connected", () => {
  console.log("Database connection successful.");
});

mongoose.connection.on("error", (e) => {
  console.log(`Error mongoose connection ${e.message}`);
});

module.exports = db;
