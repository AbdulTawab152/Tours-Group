const mongoose = require("mongoose");
const User = require("./models/User");

// Admin user data
const adminUser = {
  username: "admin",
  email: "admin@group-tours.com",
  password: "admin123",
  role: "admin",
  isActive: true,
};

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/cardsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    try {
      // Check if admin already exists
      const existingAdmin = await User.findOne({
        username: adminUser.username,
      });

      if (existingAdmin) {
        console.log("⚠️ Admin user already exists");
        console.log(`Username: ${existingAdmin.username}`);
        console.log(`Email: ${existingAdmin.email}`);
        console.log(`Role: ${existingAdmin.role}`);
        process.exit(0);
      }

      // Create new admin user
      const newAdmin = new User(adminUser);
      await newAdmin.save();

      console.log("✅ Admin user created successfully!");
      console.log(`Username: ${newAdmin.username}`);
      console.log(`Email: ${newAdmin.email}`);
      console.log(`Role: ${newAdmin.role}`);
      console.log("\n🔐 Login Credentials:");
      console.log(`Username: ${adminUser.username}`);
      console.log(`Password: ${adminUser.password}`);
      console.log("\n⚠️ Remember to change the password after first login!");

      process.exit(0);
    } catch (error) {
      console.error("❌ Error creating admin user:", error);
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
