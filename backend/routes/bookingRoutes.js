const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// Create booking
router.post("/bookings", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ confirmation: booking._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all bookings
router.get("/bookings", async (req, res) => {
  try {
    const { type } = req.query;
    let query = {};

    // Filter by booking type if specified
    if (type) {
      query.bookingType = type;
    }

    const bookings = await Booking.find(query).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single booking by ID
router.get("/bookings/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update booking
router.put("/bookings/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete booking
router.delete("/bookings/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
