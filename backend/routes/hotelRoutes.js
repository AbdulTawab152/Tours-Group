const express = require("express");
const router = express.Router();
const Hotel = require("../models/Hotel");
const multer = require("multer");
const path = require("path");

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Configure multer for multiple images
const multipleUpload = multer({ storage: storage }).array("images", 10);

// Get all hotels
router.get("/hotels", async (req, res) => {
  try {
    const hotels = await Hotel.find().sort({ createdAt: -1 });
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get hotels by city
router.get("/hotels/city/:city", async (req, res) => {
  try {
    const hotels = await Hotel.find({ city: req.params.city }).sort({
      createdAt: -1,
    });
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single hotel by ID
router.get("/hotels/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new hotel
router.post("/hotels", upload.single("image"), async (req, res) => {
  try {
    console.log("Received hotel data:", req.body);
    console.log("Received file:", req.file);

    const hotelData = {
      name: req.body.name,
      city: req.body.city,
      province: req.body.province,
      address: req.body.address,
      description: req.body.description,
      price: Number(req.body.price),
      rating: req.body.rating ? Number(req.body.rating) : 0,
      image: req.file ? `/uploads/${req.file.filename}` : undefined,
      amenities: req.body.amenities ? JSON.parse(req.body.amenities) : [],
      roomTypes: req.body.roomTypes ? JSON.parse(req.body.roomTypes) : [],
      discounts: req.body.discounts ? JSON.parse(req.body.discounts) : [],
      groupTourInfo: req.body.groupTourInfo || "",
      bookingEnabled: req.body.bookingEnabled !== "false",
    };

    console.log("Processed hotel data:", hotelData);

    const hotel = new Hotel(hotelData);
    await hotel.save();
    res.status(201).json(hotel);
  } catch (err) {
    console.error("Error creating hotel:", err);
    res.status(400).json({ error: err.message });
  }
});

// Update hotel
router.put(
  "/hotels/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  async (req, res) => {
  try {
      console.log("Updating hotel data:", req.body);
      console.log("Update files:", req.files);

    const updateData = {
        name: req.body.name,
        city: req.body.city,
        province: req.body.province,
        address: req.body.address,
        description: req.body.description,
        price: Number(req.body.price),
        rating: req.body.rating ? Number(req.body.rating) : 0,
        amenities: req.body.amenities ? JSON.parse(req.body.amenities) : [],
        roomTypes: req.body.roomTypes ? JSON.parse(req.body.roomTypes) : [],
        discounts: req.body.discounts ? JSON.parse(req.body.discounts) : [],
        groupTourInfo: req.body.groupTourInfo || "",
        bookingEnabled: req.body.bookingEnabled !== "false",
      };

      // Handle main image
      if (req.files && req.files.image) {
        updateData.image = `/uploads/${req.files.image[0].filename}`;
      }

      // Handle multiple images
      if (req.files && req.files.images) {
        const imageFiles = Array.isArray(req.files.images)
          ? req.files.images
          : [req.files.images];

        const imagePaths = imageFiles.map(
          (file) => `/uploads/${file.filename}`
        );
        
        // If there are existing images in the request body, combine them
        if (req.body.images) {
          try {
            const existingImages = JSON.parse(req.body.images);
            updateData.images = [...existingImages, ...imagePaths];
          } catch (e) {
            updateData.images = imagePaths;
          }
        } else {
          updateData.images = imagePaths;
        }
      } else if (req.body.images) {
        // Handle case where only existing images are being updated (no new files)
        try {
          updateData.images = JSON.parse(req.body.images);
        } catch (e) {
          console.error("Error parsing existing images:", e);
    }
      }

      console.log("Processed update data:", updateData);

    const hotel = await Hotel.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }
    res.json(hotel);
  } catch (err) {
      console.error("Error updating hotel:", err);

      // Provide more detailed error information
      if (err.name === "ValidationError") {
        const validationErrors = Object.values(err.errors).map(
          (e) => e.message
        );
        return res.status(400).json({
          error: "Validation failed",
          details: validationErrors,
        });
      }

    res.status(400).json({ error: err.message });
    }
  }
);

// Delete hotel
router.delete("/hotels/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }
    res.json({ message: "Hotel deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get unique cities
router.get("/hotels/cities/list", async (req, res) => {
  try {
    const cities = await Hotel.distinct("city");
    res.json(cities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
