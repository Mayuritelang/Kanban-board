const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const taskRoutes = require("./routes/taskRoutes");
app.use("/api", taskRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected.");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  
  .catch((err) => {
    console.log("DB Connection Error", err);
  });