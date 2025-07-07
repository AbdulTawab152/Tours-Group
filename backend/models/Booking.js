const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
  // Customer information
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  guests: { type: Number, required: true },
  specialRequests: String,

  // Booking type (group tour or hotel)
  bookingType: {
    type: String,
    enum: ["group", "hotel", "tour"],
    default: "group",
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },

  // Hotel-specific fields (only required for hotel bookings)
  checkIn: {
    type: Date,
    required: function () {
      return this.bookingType === "hotel";
    },
  },
  checkOut: {
    type: Date,
    required: function () {
      return this.bookingType === "hotel";
    },
  },
  roomType: {
    type: String,
    required: function () {
      return this.bookingType === "hotel";
    },
  },
  nights: {
    type: Number,
    required: function () {
      return this.bookingType === "hotel";
    },
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
      return this.bookingType === "group" || this.bookingType === "tour";
    },
  },
  hotelTitle: {
    type: String,
    required: function () {
      return this.bookingType === "group" || this.bookingType === "tour";
    },
  },
  hotelPrice: {
    type: Number,
    required: function () {
      return this.bookingType === "group" || this.bookingType === "tour";
    },
  },

  // Common fields
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Booking", bookingSchema);
