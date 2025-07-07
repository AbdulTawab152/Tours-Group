const mongoose = require("mongoose");
const Hotel = require("./models/Hotel");

// Sample hotel data
const sampleHotels = [
  {
    name: "Luxury Palace Hotel",
    city: "Kabul",
    province: "Kabul",
    description:
      "Experience luxury in the heart of Kabul with world-class amenities and stunning city views.",
    price: 150,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    amenities: ["Free WiFi", "Swimming Pool", "Spa", "Restaurant", "Gym"],
    roomTypes: [
      {
        name: "Standard Room",
        price: 150,
        capacity: 2,
        description: "Comfortable room with city view",
        features: ["Queen Bed", "City View", "Free WiFi", "TV"]
      },
      {
        name: "Deluxe Room",
        price: 200,
        capacity: 3,
        description: "Spacious room with premium amenities",
        features: ["King Bed", "Balcony", "City View", "Mini Bar", "Premium WiFi"]
      },
      {
        name: "Executive Suite",
        price: 350,
        capacity: 4,
        description: "Luxury suite with separate living area",
        features: ["King Bed", "Living Room", "Balcony", "Premium WiFi", "Room Service"]
      }
    ],
    address: "Downtown Kabul, Afghanistan",
  },
  {
    name: "Mountain View Resort",
    city: "Bamyan",
    province: "Bamyan",
    description:
      "Nestled in the beautiful Bamyan Valley with breathtaking mountain views and peaceful surroundings.",
    price: 120,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
    amenities: [
      "Mountain View",
      "Garden",
      "Restaurant",
      "Free WiFi",
      "Parking",
    ],
    roomTypes: [
      {
        name: "Standard Room",
        price: 120,
        capacity: 2,
        description: "Cozy room with mountain view",
        features: ["Queen Bed", "Mountain View", "Free WiFi", "TV"]
      },
      {
        name: "Deluxe Room",
        price: 160,
        capacity: 3,
        description: "Spacious room with panoramic mountain views",
        features: ["King Bed", "Balcony", "Mountain View", "Premium WiFi", "Fireplace"]
      }
    ],
    address: "Bamyan Valley, Afghanistan",
  },
  {
    name: "Herat Grand Hotel",
    city: "Herat",
    province: "Herat",
    description:
      "Modern comfort meets traditional charm in the historic city of Herat.",
    price: 100,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
    amenities: [
      "Business Center",
      "Restaurant",
      "Free WiFi",
      "Conference Room",
    ],
    roomTypes: [
      {
        name: "Standard Room",
        price: 100,
        capacity: 2,
        description: "Comfortable room in historic setting",
        features: ["Queen Bed", "City View", "Free WiFi", "TV"]
      },
      {
        name: "Business Room",
        price: 140,
        capacity: 2,
        description: "Perfect for business travelers",
        features: ["King Bed", "Work Desk", "High-Speed WiFi", "Business Center Access"]
      },
      {
        name: "Executive Suite",
        price: 250,
        capacity: 4,
        description: "Luxury suite with business amenities",
        features: ["King Bed", "Living Room", "Work Area", "Premium WiFi", "Conference Access"]
      }
    ],
    address: "Central Herat, Afghanistan",
  },
  {
    name: "Kandahar Plaza Hotel",
    city: "Kandahar",
    province: "Kandahar",
    description:
      "Contemporary hotel offering comfort and convenience in Kandahar city center.",
    price: 90,
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80",
    amenities: ["Free WiFi", "Restaurant", "Bar", "Parking", "Room Service"],
    roomTypes: [
      {
        name: "Standard Room",
        price: 90,
        capacity: 2,
        description: "Comfortable room in city center",
        features: ["Queen Bed", "City View", "Free WiFi", "TV"]
      },
      {
        name: "Deluxe Room",
        price: 130,
        capacity: 3,
        description: "Spacious room with premium amenities",
        features: ["King Bed", "Balcony", "City View", "Mini Bar", "Premium WiFi"]
      }
    ],
    address: "Kandahar City Center, Afghanistan",
  },
  {
    name: "Mazar-e-Sharif Palace",
    city: "Mazar-e-Sharif",
    province: "Balkh",
    description:
      "Elegant hotel near the famous Blue Mosque with traditional Afghan hospitality.",
    price: 110,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    amenities: [
      "Near Blue Mosque",
      "Restaurant",
      "Free WiFi",
      "Garden",
      "Traditional Decor",
    ],
    roomTypes: [
      {
        name: "Standard Room",
        price: 110,
        capacity: 2,
        description: "Traditional room with garden view",
        features: ["Queen Bed", "Garden View", "Free WiFi", "TV"]
      },
      {
        name: "Deluxe Room",
        price: 160,
        capacity: 3,
        description: "Spacious room with traditional decor",
        features: ["King Bed", "Balcony", "Garden View", "Premium WiFi", "Traditional Decor"]
      },
      {
        name: "Royal Suite",
        price: 300,
        capacity: 4,
        description: "Luxury suite with traditional Afghan design",
        features: ["King Bed", "Living Room", "Balcony", "Premium WiFi", "Traditional Decor", "Room Service"]
      }
    ],
    address: "Near Blue Mosque, Mazar-e-Sharif, Afghanistan",
  },
  {
    name: "Jalalabad Riverside Hotel",
    city: "Jalalabad",
    province: "Nangarhar",
    description:
      "Peaceful riverside hotel with beautiful gardens and modern amenities.",
    price: 85,
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
    amenities: [
      "Riverside View",
      "Garden",
      "Restaurant",
      "Free WiFi",
      "Parking",
    ],
    roomTypes: [
      {
        name: "Standard Room",
        price: 85,
        capacity: 2,
        description: "Comfortable room with garden view",
        features: ["Queen Bed", "Garden View", "Free WiFi", "TV"]
      },
      {
        name: "Garden View Room",
        price: 120,
        capacity: 3,
        description: "Spacious room with beautiful garden and river views",
        features: ["King Bed", "Balcony", "Garden View", "River View", "Premium WiFi"]
      }
    ],
    address: "Riverside, Jalalabad, Afghanistan",
  },
  {
    name: "Kabul Business Center",
    city: "Kabul",
    province: "Kabul",
    description:
      "Perfect for business travelers with modern facilities and central location.",
    price: 130,
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
    amenities: [
      "Business Center",
      "Conference Rooms",
      "Free WiFi",
      "Restaurant",
      "Gym",
    ],
    roomTypes: [
      {
        name: "Business Room",
        price: 130,
        capacity: 2,
        description: "Perfect for business travelers",
        features: ["King Bed", "Work Desk", "High-Speed WiFi", "Business Center Access"]
      },
      {
        name: "Executive Room",
        price: 180,
        capacity: 2,
        description: "Premium business room with extra amenities",
        features: ["King Bed", "Work Area", "Premium WiFi", "Business Center Access", "Mini Bar"]
      },
      {
        name: "Executive Suite",
        price: 280,
        capacity: 4,
        description: "Luxury suite with full business facilities",
        features: ["King Bed", "Living Room", "Work Area", "Premium WiFi", "Conference Access", "Room Service"]
      }
    ],
    address: "Business District, Kabul, Afghanistan",
  },
  {
    name: "Bamyan Eco Lodge",
    city: "Bamyan",
    province: "Bamyan",
    description:
      "Eco-friendly accommodation with stunning views of the Buddha cliffs.",
    price: 95,
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
    amenities: [
      "Eco-friendly",
      "Mountain View",
      "Garden",
      "Restaurant",
      "Hiking Tours",
    ],
    roomTypes: [
      {
        name: "Standard Room",
        price: 95,
        capacity: 2,
        description: "Eco-friendly room with mountain view",
        features: ["Queen Bed", "Mountain View", "Free WiFi", "Eco-friendly"]
      },
      {
        name: "Deluxe Room",
        price: 140,
        capacity: 3,
        description: "Spacious eco-friendly room with panoramic views",
        features: ["King Bed", "Balcony", "Mountain View", "Premium WiFi", "Eco-friendly"]
      }
    ],
    address: "Buddha Cliffs Area, Bamyan, Afghanistan",
  },
];

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://abdultawabsamadzai:gfBiuGJLUKRubwIt@cluster0.ysv44j0.mongodb.net/Group-Tours",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    try {
      // Clear existing hotels
      await Hotel.deleteMany({});
      console.log("🗑️ Cleared existing hotels");

      // Insert sample hotels
      const hotels = await Hotel.insertMany(sampleHotels);
      console.log(`✅ Added ${hotels.length} sample hotels`);

      // Display added hotels
      hotels.forEach((hotel) => {
        console.log(`🏨 ${hotel.name} - ${hotel.city} - $${hotel.price}/night`);
      });

      console.log("\n🎉 Sample hotel data added successfully!");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error adding sample hotels:", error);
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
