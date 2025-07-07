const mongoose = require("mongoose");
const User = require("./models/User");

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://abdultawabsamadzai:gfBiuGJLUKRubwIt@cluster0.ysv44j0.mongodb.net/myDatabase",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    try {
      // Find admin user
      const adminUser = await User.findOne({ username: "admin" });

      if (!adminUser) {
        console.log("❌ Admin user not found in database");
        console.log("Available users:");
        const allUsers = await User.find({});
        allUsers.forEach(user => {
          console.log(`- Username: ${user.username}, Role: ${user.role}, Active: ${user.isActive}`);
        });
      } else {
        console.log("✅ Admin user found!");
        console.log(`Username: ${adminUser.username}`);
        console.log(`Email: ${adminUser.email}`);
        console.log(`Role: ${adminUser.role}`);
        console.log(`Active: ${adminUser.isActive}`);
        console.log(`Password hash exists: ${!!adminUser.password}`);
        console.log(`Password hash length: ${adminUser.password ? adminUser.password.length : 0}`);
        
        // Test password comparison
        console.log("\n🔍 Testing password comparison...");
        const testPassword = "admin123";
        const isPasswordValid = await adminUser.comparePassword(testPassword);
        console.log(`Password "admin123" is valid: ${isPasswordValid}`);
        
        // Test with wrong password
        const wrongPassword = "wrongpassword";
        const isWrongPasswordValid = await adminUser.comparePassword(wrongPassword);
        console.log(`Password "wrongpassword" is valid: ${isWrongPasswordValid}`);
      }

      process.exit(0);
    } catch (error) {
      console.error("❌ Error checking admin user:", error);
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }); 