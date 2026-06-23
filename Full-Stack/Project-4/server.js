require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

connectDB();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/students", studentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
