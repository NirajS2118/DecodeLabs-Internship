require("dotenv").config();

const express = require("express");
const path = require("path");

const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// Serve Frontend Files
app.use(express.static(path.join(__dirname, "assets")));

// Home Route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "assets", "index.html"));
});

// Student Routes
app.use("/students", studentRoutes);

// Optional Health Check Route
app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "Student Records Manager API is running",
  });
});

// Handle Invalid Routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});