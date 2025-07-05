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
    roomTypes: ["Standard", "Deluxe", "Suite"],
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
    roomTypes: ["Standard", "Deluxe"],
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
    roomTypes: ["Standard", "Business", "Suite"],
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
    roomTypes: ["Standard", "Deluxe"],
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
    roomTypes: ["Standard", "Deluxe", "Royal Suite"],
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
    roomTypes: ["Standard", "Garden View"],
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
    roomTypes: ["Business", "Executive", "Suite"],
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
    roomTypes: ["Standard", "Deluxe"],
    address: "Buddha Cliffs Area, Bamyan, Afghanistan",
  },
];

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/cardsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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
