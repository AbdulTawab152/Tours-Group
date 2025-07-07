const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config(); // 🔑 Load environment variables

const cardRoutes = require("./routes/cardRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// ✅ Test env
console.log("🌍 MONGODB_URI:", process.env.MONGODB_URI);

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

// MongoDB connection (no need for deprecated options anymore)
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("🚀 Server is running and connected to MongoDB Atlas!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
