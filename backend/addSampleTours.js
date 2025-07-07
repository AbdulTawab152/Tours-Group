const mongoose = require("mongoose");
const Card = require("./models/Card");

// Sample tour data for Afghan provinces
const sampleTours = [
  {
    title: "Herat Cultural Heritage Tour",
    name: "Herat Cultural Heritage Tour",
    description: "Explore the ancient city of Herat, known as the 'Pearl of Khorasan'. Visit the historic Herat Citadel, the Friday Mosque, and the beautiful gardens that made Herat famous throughout the Islamic world.",
    location: "Herat",
    province: "Herat",
    price: 450,
    duration: "3 Days",
    groupSize: "8-12 people",
    dates: ["2024-03-15", "2024-04-20", "2024-05-10", "2024-06-05"],
    rating: 4.8,
    features: [
      "Professional local guide",
      "Hotel accommodation",
      "All meals included",
      "Transportation",
      "Entrance fees",
      "Cultural experiences"
    ],
    itinerary: "Day 1: Arrival in Herat, visit Herat Citadel and Friday Mosque\nDay 2: Explore Musalla Complex and traditional bazaars\nDay 3: Visit Gazar Gah shrine and return",
    includedServices: "• Hotel accommodation (3-star)\n• All meals (breakfast, lunch, dinner)\n• Professional English-speaking guide\n• Air-conditioned transportation\n• All entrance fees\n• Cultural experiences and workshops",
    excludedServices: "• International flights\n• Travel insurance\n• Personal expenses\n• Tips for guides and drivers",
    requirements: "• Valid passport\n• Comfortable walking shoes\n• Modest clothing for mosque visits\n• Camera for photography",
    cancellationPolicy: "Free cancellation up to 7 days before departure. 50% refund for cancellations 3-7 days before. No refund for cancellations less than 3 days before departure.",
    highlights: "• Visit the 13th-century Herat Citadel\n• Explore the stunning Friday Mosque\n• Experience traditional Afghan hospitality\n• Learn about Herat's rich cultural heritage",
    testimonials: "Amazing experience! The guide was knowledgeable and the cultural sites were breathtaking. Highly recommend this tour for anyone interested in Afghan history and culture.",
    faq: "Q: Is it safe to travel to Herat?\nA: Yes, Herat is one of the safest cities in Afghanistan with a rich cultural heritage.\n\nQ: What should I wear?\nA: Modest clothing is recommended, especially when visiting religious sites.\n\nQ: Are meals included?\nA: Yes, all meals are included in the tour price.",
    bookingEnabled: true,
    featured: true,
    discountPercentage: 10,
    discountDescription: "Early Bird Discount"
  },
  {
    title: "Kabul Historical Discovery",
    name: "Kabul Historical Discovery",
    description: "Discover the heart of Afghanistan in Kabul. From the historic Babur Gardens to the National Museum, experience the rich history and culture of Afghanistan's capital city.",
    location: "Kabul",
    province: "Kabul",
    price: 380,
    duration: "2 Days",
    groupSize: "6-10 people",
    dates: ["2024-03-20", "2024-04-15", "2024-05-25", "2024-06-15"],
    rating: 4.6,
    features: [
      "Expert local guide",
      "Hotel accommodation",
      "Breakfast and lunch",
      "Transportation",
      "Museum entrance fees",
      "Historical sites visit"
    ],
    itinerary: "Day 1: Babur Gardens, National Museum, Darul Aman Palace\nDay 2: Kabul Zoo, traditional markets, return",
    includedServices: "• Hotel accommodation (3-star)\n• Breakfast and lunch\n• Professional guide\n• Transportation\n• Museum entrance fees",
    excludedServices: "• International flights\n• Travel insurance\n• Dinner\n• Personal expenses",
    requirements: "• Valid passport\n• Comfortable walking shoes\n• Camera",
    cancellationPolicy: "Free cancellation up to 5 days before departure. 30% refund for cancellations 2-5 days before.",
    highlights: "• Visit the beautiful Babur Gardens\n• Explore the National Museum\n• See the historic Darul Aman Palace\n• Experience Kabul's vibrant culture",
    testimonials: "Kabul surprised me with its beauty and history. The Babur Gardens were stunning and the museum was fascinating.",
    faq: "Q: Is Kabul safe for tourists?\nA: Yes, with proper guidance and local support, Kabul is accessible for tourists.\n\nQ: What's the best time to visit?\nA: Spring (March-May) and Fall (September-November) offer the best weather.",
    bookingEnabled: true,
    featured: false
  },
  {
    title: "Bamyan Valley Adventure",
    name: "Bamyan Valley Adventure",
    description: "Journey to the stunning Bamyan Valley, home to the ancient Buddha statues and breathtaking landscapes. Experience the unique culture of the Hazara people.",
    location: "Bamyan",
    province: "Bamyan",
    price: 520,
    duration: "4 Days",
    groupSize: "4-8 people",
    dates: ["2024-04-10", "2024-05-15", "2024-06-20", "2024-07-10"],
    rating: 4.9,
    features: [
      "Expert mountain guide",
      "Lodge accommodation",
      "All meals included",
      "Transportation",
      "Cultural experiences",
      "Photography opportunities"
    ],
    itinerary: "Day 1: Arrival, visit Buddha niches\nDay 2: Band-e-Amir National Park\nDay 3: Local village visit and cultural exchange\nDay 4: Return to Kabul",
    includedServices: "• Lodge accommodation\n• All meals (traditional Afghan cuisine)\n• Expert mountain guide\n• Transportation\n• Cultural experiences\n• Photography guidance",
    excludedServices: "• International flights\n• Travel insurance\n• Personal expenses\n• Tips",
    requirements: "• Good physical condition\n• Warm clothing (mountain weather)\n• Camera for stunning landscapes\n• Respect for local customs",
    cancellationPolicy: "Free cancellation up to 10 days before departure. 50% refund for cancellations 5-10 days before.",
    highlights: "• Visit the historic Buddha niches\n• Explore Band-e-Amir National Park\n• Experience Hazara culture\n• Stunning mountain landscapes",
    testimonials: "Bamyan was absolutely breathtaking! The landscapes are incredible and the local people were so welcoming. A truly unforgettable experience.",
    faq: "Q: Is the altitude a problem?\nA: Bamyan is at 2,500m altitude. Most people adjust well, but take it easy on arrival.\n\nQ: What's the weather like?\nA: Cool in summer, very cold in winter. Best visited April-October.",
    bookingEnabled: true,
    featured: true,
    discountPercentage: 15,
    discountDescription: "Adventure Package Discount"
  },
  {
    title: "Kandahar Heritage Tour",
    name: "Kandahar Heritage Tour",
    description: "Explore the historic city of Kandahar, once the capital of the Durrani Empire. Visit ancient mosques, traditional bazaars, and learn about the city's rich history.",
    location: "Kandahar",
    province: "Kandahar",
    price: 420,
    duration: "3 Days",
    groupSize: "6-12 people",
    dates: ["2024-03-25", "2024-04-30", "2024-05-20", "2024-06-25"],
    rating: 4.5,
    features: [
      "Local heritage guide",
      "Hotel accommodation",
      "Traditional meals",
      "Transportation",
      "Cultural workshops",
      "Historical sites"
    ],
    itinerary: "Day 1: Arrival, visit Friday Mosque and bazaars\nDay 2: Explore ancient sites and traditional crafts\nDay 3: Cultural workshops and return",
    includedServices: "• Hotel accommodation\n• Traditional Afghan meals\n• Heritage guide\n• Transportation\n• Cultural workshops\n• Historical site visits",
    excludedServices: "• International flights\n• Travel insurance\n• Personal expenses\n• Tips",
    requirements: "• Valid passport\n• Modest clothing\n• Respect for local customs\n• Camera",
    cancellationPolicy: "Free cancellation up to 7 days before departure. 40% refund for cancellations 3-7 days before.",
    highlights: "• Visit historic Friday Mosque\n• Explore traditional bazaars\n• Learn about Durrani Empire history\n• Experience local crafts and culture",
    testimonials: "Kandahar's history is fascinating and the local people were incredibly hospitable. The traditional bazaars were a highlight.",
    faq: "Q: What's the best time to visit Kandahar?\nA: Spring and Fall offer the most pleasant weather for exploring.\n\nQ: Are there cultural considerations?\nA: Yes, modest dress and respect for local customs are important.",
    bookingEnabled: true,
    featured: false
  }
];

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
      // Clear existing sample tours
      await Card.deleteMany({ title: { $in: sampleTours.map(tour => tour.title) } });
      console.log("🗑️ Cleared existing sample tours");

      // Add new sample tours
      for (const tour of sampleTours) {
        const newTour = new Card(tour);
        await newTour.save();
        console.log(`✅ Added tour: ${tour.title}`);
      }

      console.log("\n🎉 All sample tours added successfully!");
      console.log(`📊 Total tours in database: ${await Card.countDocuments()}`);
      
      process.exit(0);
    } catch (error) {
      console.error("❌ Error adding sample tours:", error);
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }); 