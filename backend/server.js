const express = require("express");
const mongoose = require("mongoose"); // This line was missing
const cors = require("cors");
const cardRoutes = require("./routes/cardRoutes");
const path = require("path");
const bookingRoutes = require("./routes/bookingRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api", cardRoutes);
app.use("/api", bookingRoutes);
app.use("/api", hotelRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
// Database connection

mongoose
  .connect("mongodb://localhost:27017/cardsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Basic route to test server
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
