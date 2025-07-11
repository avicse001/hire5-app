const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());

// ✅ NEW: Add this root route
app.get("/", (req, res) => {
  res.send("Hire5 backend is running.");
});

const rawData = fs.readFileSync("form-submissions.json");
const applicants = JSON.parse(rawData);

app.get("/api/applicants", (req, res) => {
  res.json(applicants);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
