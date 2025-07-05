const express = require("express");
const { adminAuth } = require("../middleware/auth");
const Card = require("../models/Card");
const Booking = require("../models/Booking");
const Hotel = require("../models/Hotel");
const User = require("../models/User");
const router = express.Router();

// Apply admin authentication to all routes
router.use(adminAuth);

// Dashboard stats
router.get("/dashboard/stats", async (req, res) => {
  try {
    const totalCards = await Card.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const totalHotels = await Hotel.countDocuments();
    const totalUsers = await User.countDocuments();

    // Recent bookings
    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("hotelId", "name")
      .populate("groupTourId", "title");

    // Revenue stats
    const confirmedBookings = await Booking.find({ status: "confirmed" });
    const totalRevenue = confirmedBookings.reduce(
      (sum, booking) => sum + (booking.totalPrice || 0),
      0
    );

    res.json({
      stats: {
        totalCards,
        totalBookings,
        totalHotels,
        totalUsers,
        totalRevenue,
      },
      recentBookings,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
});

// Get all bookings (admin only)
router.get("/bookings", async (req, res) => {
  try {
    const { type, page = 1, limit = 20, status, search } = req.query;

    let query = {};

    // Filter by booking type
    if (type) {
      query.bookingType = type;
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Search functionality
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { hotelName: { $regex: search, $options: "i" } },
        { hotelTitle: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const bookings = await Booking.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate("hotelId", "name city")
      .populate("groupTourId", "title location");

    const total = await Booking.countDocuments(query);

    res.json({
      bookings,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        totalItems: total,
      },
    });
  } catch (error) {
    console.error("Get bookings error:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// Update booking status (admin only)
router.put("/bookings/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json({ message: "Booking status updated", booking });
  } catch (error) {
    console.error("Update booking status error:", error);
    res.status(500).json({ error: "Failed to update booking status" });
  }
});

// Delete booking (admin only)
router.delete("/bookings/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Delete booking error:", error);
    res.status(500).json({ error: "Failed to delete booking" });
  }
});

// Get all cards (admin only)
router.get("/cards", async (req, res) => {
  try {
    const cards = await Card.find().sort({ createdAt: -1 });
    res.json(cards);
  } catch (error) {
    console.error("Get cards error:", error);
    res.status(500).json({ error: "Failed to fetch cards" });
  }
});

// Create new card (admin only)
router.post("/cards", async (req, res) => {
  try {
    const card = new Card(req.body);
    await card.save();
    res.status(201).json({ message: "Card created successfully", card });
  } catch (error) {
    console.error("Create card error:", error);
    res.status(400).json({ error: "Failed to create card" });
  }
});

// Update card (admin only)
router.put("/cards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findByIdAndUpdate(id, req.body, { new: true });

    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }

    res.json({ message: "Card updated successfully", card });
  } catch (error) {
    console.error("Update card error:", error);
    res.status(400).json({ error: "Failed to update card" });
  }
});

// Delete card (admin only)
router.delete("/cards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findByIdAndDelete(id);

    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }

    res.json({ message: "Card deleted successfully" });
  } catch (error) {
    console.error("Delete card error:", error);
    res.status(500).json({ error: "Failed to delete card" });
  }
});

// Get all hotels (admin only)
router.get("/hotels", async (req, res) => {
  try {
    const hotels = await Hotel.find().sort({ createdAt: -1 });
    res.json(hotels);
  } catch (error) {
    console.error("Get hotels error:", error);
    res.status(500).json({ error: "Failed to fetch hotels" });
  }
});

// Create new hotel (admin only)
router.post("/hotels", async (req, res) => {
  try {
    const hotel = new Hotel(req.body);
    await hotel.save();
    res.status(201).json({ message: "Hotel created successfully", hotel });
  } catch (error) {
    console.error("Create hotel error:", error);
    res.status(400).json({ error: "Failed to create hotel" });
  }
});

// Update hotel (admin only)
router.put("/hotels/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findByIdAndUpdate(id, req.body, { new: true });

    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    res.json({ message: "Hotel updated successfully", hotel });
  } catch (error) {
    console.error("Update hotel error:", error);
    res.status(400).json({ error: "Failed to update hotel" });
  }
});

// Delete hotel (admin only)
router.delete("/hotels/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findByIdAndDelete(id);

    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    res.json({ message: "Hotel deleted successfully" });
  } catch (error) {
    console.error("Delete hotel error:", error);
    res.status(500).json({ error: "Failed to delete hotel" });
  }
});

module.exports = router;
