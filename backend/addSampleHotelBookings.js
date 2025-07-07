yconst mongoose = require("mongoose");
const Booking = require("./models/Booking");
const Hotel = require("./models/Hotel");

// Sample hotel booking data
const sampleHotelBookings = [
  {
    hotelName: "Luxury Palace Hotel",
    hotelCity: "Kabul",
    hotelImage:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    checkIn: "2024-02-15",
    checkOut: "2024-02-18",
    guests: 2,
    roomType: "Deluxe",
    totalPrice: 450,
    nights: 3,
    fullName: "Ahmad Khan",
    email: "ahmad.khan@email.com",
    phone: "+93 70 123 4567",
    specialRequests: "Early check-in if possible",
    status: "confirmed",
    bookingType: "hotel",
    hotelInfo: {
      name: "Luxury Palace Hotel",
      city: "Kabul",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      amenities: ["Free WiFi", "Swimming Pool", "Spa", "Restaurant", "Gym"],
      roomTypes: ["Standard", "Deluxe", "Suite"],
    },
  },
  {
    hotelName: "Mountain View Resort",
    hotelCity: "Bamyan",
    hotelImage:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
    checkIn: "2024-02-20",
    checkOut: "2024-02-23",
    guests: 3,
    roomType: "Standard",
    totalPrice: 360,
    nights: 3,
    fullName: "Fatima Zahra",
    email: "fatima.zahra@email.com",
    phone: "+93 79 234 5678",
    specialRequests: "Mountain view room preferred",
    status: "pending",
    bookingType: "hotel",
    hotelInfo: {
      name: "Mountain View Resort",
      city: "Bamyan",
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
    },
  },
  {
    hotelName: "Herat Grand Hotel",
    hotelCity: "Herat",
    hotelImage:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
    checkIn: "2024-02-25",
    checkOut: "2024-02-28",
    guests: 1,
    roomType: "Business",
    totalPrice: 300,
    nights: 3,
    fullName: "Mohammad Ali",
    email: "mohammad.ali@email.com",
    phone: "+93 78 345 6789",
    specialRequests: "Business center access needed",
    status: "confirmed",
    bookingType: "hotel",
    hotelInfo: {
      name: "Herat Grand Hotel",
      city: "Herat",
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
      amenities: [
        "Business Center",
        "Restaurant",
        "Free WiFi",
        "Conference Room",
      ],
      roomTypes: ["Standard", "Business", "Suite"],
    },
  },
  {
    hotelName: "Kandahar Plaza Hotel",
    hotelCity: "Kandahar",
    hotelImage:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80",
    checkIn: "2024-03-01",
    checkOut: "2024-03-03",
    guests: 4,
    roomType: "Deluxe",
    totalPrice: 180,
    nights: 2,
    fullName: "Zahra Hussain",
    email: "zahra.hussain@email.com",
    phone: "+93 77 456 7890",
    specialRequests: "Family room with connecting doors",
    status: "cancelled",
    bookingType: "hotel",
    hotelInfo: {
      name: "Kandahar Plaza Hotel",
      city: "Kandahar",
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80",
      amenities: ["Free WiFi", "Restaurant", "Bar", "Parking", "Room Service"],
      roomTypes: ["Standard", "Deluxe"],
    },
  },
  {
    hotelName: "Mazar-e-Sharif Palace",
    hotelCity: "Mazar-e-Sharif",
    hotelImage:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    checkIn: "2024-03-05",
    checkOut: "2024-03-08",
    guests: 2,
    roomType: "Royal Suite",
    totalPrice: 330,
    nights: 3,
    fullName: "Abdul Rahman",
    email: "abdul.rahman@email.com",
    phone: "+93 76 567 8901",
    specialRequests: "Near Blue Mosque view",
    status: "confirmed",
    bookingType: "hotel",
    hotelInfo: {
      name: "Mazar-e-Sharif Palace",
      city: "Mazar-e-Sharif",
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
    },
  },
  {
    hotelName: "Jalalabad Riverside Hotel",
    hotelCity: "Jalalabad",
    hotelImage:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
    checkIn: "2024-03-10",
    checkOut: "2024-03-12",
    guests: 1,
    roomType: "Garden View",
    totalPrice: 170,
    nights: 2,
    fullName: "Nadia Karimi",
    email: "nadia.karimi@email.com",
    phone: "+93 75 678 9012",
    specialRequests: "Quiet room with garden view",
    status: "pending",
    bookingType: "hotel",
    hotelInfo: {
      name: "Jalalabad Riverside Hotel",
      city: "Jalalabad",
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
    },
  },
  {
    hotelName: "Kabul Business Center",
    hotelCity: "Kabul",
    hotelImage:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
    checkIn: "2024-03-15",
    checkOut: "2024-03-18",
    guests: 2,
    roomType: "Executive",
    totalPrice: 390,
    nights: 3,
    fullName: "Hassan Mohammadi",
    email: "hassan.mohammadi@email.com",
    phone: "+93 74 789 0123",
    specialRequests: "Conference room booking for business meetings",
    status: "confirmed",
    bookingType: "hotel",
    hotelInfo: {
      name: "Kabul Business Center",
      city: "Kabul",
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
    },
  },
  {
    hotelName: "Bamyan Eco Lodge",
    hotelCity: "Bamyan",
    hotelImage:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
    checkIn: "2024-03-20",
    checkOut: "2024-03-22",
    guests: 2,
    roomType: "Deluxe",
    totalPrice: 190,
    nights: 2,
    fullName: "Sara Ahmadi",
    email: "sara.ahmadi@email.com",
    phone: "+93 73 890 1234",
    specialRequests: "Eco-friendly room with mountain views",
    status: "pending",
    bookingType: "hotel",
    hotelInfo: {
      name: "Bamyan Eco Lodge",
      city: "Bamyan",
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
    },
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
      // Get all hotels to map names to IDs
      const hotels = await Hotel.find();
      const hotelMap = {};
      hotels.forEach((hotel) => {
        hotelMap[hotel.name] = hotel._id;
      });

      // Clear existing hotel bookings
      await Booking.deleteMany({ bookingType: "hotel" });
      console.log("🗑️ Cleared existing hotel bookings");

      // Add hotelId to each booking
      const bookingsWithIds = sampleHotelBookings.map((booking) => ({
        ...booking,
        hotelId: hotelMap[booking.hotelName],
      }));

      // Insert sample hotel bookings
      const bookings = await Booking.insertMany(bookingsWithIds);
      console.log(`✅ Added ${bookings.length} sample hotel bookings`);

      // Display added bookings
      bookings.forEach((booking) => {
        console.log(
          `🏨 ${booking.hotelName} - ${booking.fullName} - $${booking.totalPrice} - ${booking.status}`
        );
      });

      console.log("\n🎉 Sample hotel booking data added successfully!");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error adding sample hotel bookings:", error);
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
