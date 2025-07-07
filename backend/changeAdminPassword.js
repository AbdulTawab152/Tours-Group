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
        process.exit(1);
      }

      console.log("✅ Admin user found!");
      console.log(`Current username: ${adminUser.username}`);
      console.log(`Current email: ${adminUser.email}`);

      // New password
      const newPassword = "admin123";
      
      // Update password
      adminUser.password = newPassword;
      await adminUser.save();

      console.log("✅ Admin password updated successfully!");
      console.log(`New password: ${newPassword}`);
      console.log("\n🔐 New Login Credentials:");
      console.log(`Username: ${adminUser.username}`);
      console.log(`Password: ${newPassword}`);

      // Test the new password
      console.log("\n🔍 Testing new password...");
      const isPasswordValid = await adminUser.comparePassword(newPassword);
      console.log(`Password test result: ${isPasswordValid ? "✅ Valid" : "❌ Invalid"}`);

      process.exit(0);
    } catch (error) {
      console.error("❌ Error updating admin password:", error);
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }); 