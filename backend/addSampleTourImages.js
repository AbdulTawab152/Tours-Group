const mongoose = require("mongoose");
const Card = require("./models/Card");

// Sample images for tours (using placeholder URLs for demonstration)
const tourImages = {
  "Herat Cultural Heritage Tour": [
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80"
  ],
  "Kabul Historical Discovery": [
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80"
  ],
  "Bamyan Valley Adventure": [
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80"
  ],
  "Kandahar Heritage Tour": [
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80"
  ]
};

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
      // Update each tour with sample images
      for (const [tourTitle, images] of Object.entries(tourImages)) {
        const tour = await Card.findOne({ title: tourTitle });
        
        if (tour) {
          tour.images = images;
          await tour.save();
          console.log(`✅ Added ${images.length} images to: ${tourTitle}`);
        } else {
          console.log(`❌ Tour not found: ${tourTitle}`);
        }
      }

      console.log("\n🎉 All tour images updated successfully!");
      console.log(`📊 Total tours with images: ${await Card.countDocuments({ images: { $exists: true, $ne: [] } })}`);
      
      process.exit(0);
    } catch (error) {
      console.error("❌ Error updating tour images:", error);
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }); 