const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  name: { type: String, required: true },
  description: String,
  image: String,
  images: [{ type: String }], // Gallery images
  location: { type: String, required: true },
  province: { type: String, required: true },
  price: { type: Number, required: true },
  duration: String,
  groupSize: String,
  dates: [String],
  rating: { type: Number, min: 0, max: 5 },
  features: [String],
  itinerary: String,
  includedServices: String,
  excludedServices: String,
  requirements: String,
  cancellationPolicy: String,
  highlights: String,
  testimonials: String,
  faq: String,
  bookingEnabled: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  discountPercentage: Number,
  discountDescription: String,
  createdAt: { type: Date, default: Date.now },
});

// نام collection را به صورت صریح مشخص کنید
module.exports = mongoose.model("Card", cardSchema, "cards");
