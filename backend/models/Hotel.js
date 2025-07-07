const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }, // Base price for standard room
  rating: { type: Number, default: 0 },
  image: { type: String, required: false },
  images: [{ type: String }], // Gallery images
  amenities: [{ type: String }],
  roomTypes: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      capacity: { type: Number, required: true },
      description: { type: String },
      features: [{ type: String }]
    }
  ],
  address: { type: String, required: true },
  discounts: [
    {
      description: { type: String },
      percentage: { type: Number },
      minPeople: { type: Number },
    },
  ],
  groupTourInfo: { type: String, default: "" },
  bookingEnabled: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Hotel", hotelSchema);
