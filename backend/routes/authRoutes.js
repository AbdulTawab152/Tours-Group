const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { authenticateToken } = require("../middleware/auth");
const router = express.Router();

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

// Login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("🔍 Login attempt:", { username, password: password ? "***" : "undefined" });

    // Validate input
    if (!username || !password) {
      console.log("❌ Missing username or password");
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    // Find user by username
    const user = await User.findOne({ username });
    console.log("🔍 User found:", user ? "Yes" : "No");
    if (!user) {
      console.log("❌ User not found in database");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.log("🔍 User details:", {
      username: user.username,
      role: user.role,
      isActive: user.isActive,
      hasPassword: !!user.password
    });

    // Check if user is active
    if (!user.isActive) {
      console.log("❌ User account is deactivated");
      return res.status(401).json({ error: "Account is deactivated" });
    }

    // Verify password
    console.log("🔍 Comparing password...");
    const isPasswordValid = await user.comparePassword(password);
    console.log("🔍 Password valid:", isPasswordValid);
    if (!isPasswordValid) {
      console.log("❌ Password comparison failed");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Return user data (without password) and token
    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin,
    };

    res.json({
      message: "Login successful",
      token,
      user: userData,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get current user profile
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const userData = {
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role,
      isActive: req.user.isActive,
      createdAt: req.user.createdAt,
      lastLogin: req.user.lastLogin,
    };

    res.json({ user: userData });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Logout route (client-side token removal)
router.post("/logout", authenticateToken, async (req, res) => {
  try {
    // In a more advanced setup, you might want to blacklist the token
    // For now, we'll just return a success message
    res.json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Verify token route
router.get("/verify", authenticateToken, async (req, res) => {
  try {
    res.json({
      valid: true,
      user: {
        _id: req.user._id,
        username: req.user.username,
        role: req.user.role,
      },
    });
  } catch (error) {
    res.status(401).json({ valid: false, error: "Invalid token" });
  }
});

// Change password route
router.post("/change-password", authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        error: "Current password and new password are required" 
      });
    }

    // Find user
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
