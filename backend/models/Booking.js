const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
  // Customer information
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  guests: { type: Number, required: true },
  roomType: { type: String, required: true },
  specialRequests: String,

  // Booking type (group tour or hotel)
  bookingType: { type: String, enum: ["group", "hotel"], default: "group" },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },

  // Hotel information (for hotel bookings)
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: function () {
      return this.bookingType === "hotel";
    },
  },
  hotelName: {
    type: String,
    required: function () {
      return this.bookingType === "hotel";
    },
  },
  hotelCity: {
    type: String,
    required: function () {
      return this.bookingType === "hotel";
    },
  },
  hotelImage: {
    type: String,
    required: function () {
      return this.bookingType === "hotel";
    },
  },
  hotelInfo: { type: Object },

  // Group tour information (for group bookings)
  groupTourId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Card",
    required: function () {
      return this.bookingType === "group";
    },
  },
  hotelTitle: {
    type: String,
    required: function () {
      return this.bookingType === "group";
    },
  },
  hotelPrice: {
    type: Number,
    required: function () {
      return this.bookingType === "group";
    },
  },

  // Common fields
  totalPrice: { type: Number, required: true },
  nights: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Booking", bookingSchema);
