const express = require("express");
const router = express.Router();
const Card = require("../models/Card");
const multer = require("multer");
const path = require("path");

router.get("/cards", async (req, res) => {
  try {
    const cards = await Card.find(); // اطمینان حاصل کنید که از مدل Card استفاده می‌کنید
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Create card
// Update your existing POST route with this code
router.post("/cards", upload.single("image"), async (req, res) => {
  try {
    console.log("Received data:", req.body); // Debugging
    console.log("Received file:", req.file); // Debugging

    const {
      title,
      description,
      province,
      price,
      duration,
      dates,
      rating,
      features,
    } = req.body;

    // Validate required fields
    if (!title || !province || !price) {
      return res
        .status(400)
        .json({ error: "Missing required fields (title, province, or price)" });
    }

    const cardData = {
      title,
      name: title, // Use title as name since it's required
      description: description || "",
      location: province, // Use province as location since it's required
      province,
      price: Number(price),
      duration: duration || "",
      dates: dates ? dates.split(",").map((date) => date.trim()) : [],
      rating: rating ? Number(rating) : 0,
      features: features ? features.split(",").map((feat) => feat.trim()) : [],
      image: req.file ? `/uploads/${req.file.filename}` : undefined,
    };

    const card = new Card(cardData);
    await card.save();
    res.status(201).json(card);
  } catch (err) {
    console.error("Error creating card:", err);
    console.error("Error details:", {
      message: err.message,
      stack: err.stack,
      name: err.name,
    });
    res.status(500).json({
      error: "Server error. Check backend logs.",
      details: err.message,
    });
  }
});

// Get all cards - Remove duplicate route
// router.get("/cards", async (req, res) => {
//   const cards = await Card.find();
//   res.json(cards);
// });

// Delete card
router.delete("/cards/:id", async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id);
    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }
    res.json({ message: "Card deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update card
router.put(
  "/cards/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  async (req, res) => {
    try {
      console.log("Updating card data:", req.body);
      console.log("Update file:", req.file);

      const updateData = {
        title: req.body.title,
        name: req.body.name,
        description: req.body.description || "",
        location: req.body.location,
        province: req.body.province,
        price: Number(req.body.price),
        duration: req.body.duration || "",
        groupSize: req.body.groupSize || "",
        dates: req.body.dates
          ? req.body.dates.split(",").map((date) => date.trim())
          : [],
        rating: req.body.rating ? Number(req.body.rating) : 0,
        features: req.body.features ? JSON.parse(req.body.features) : [],
        itinerary: req.body.itinerary || "",
        includedServices: req.body.includedServices || "",
        excludedServices: req.body.excludedServices || "",
        requirements: req.body.requirements || "",
        cancellationPolicy: req.body.cancellationPolicy || "",
        highlights: req.body.highlights || "",
        testimonials: req.body.testimonials || "",
        faq: req.body.faq || "",
        bookingEnabled: req.body.bookingEnabled !== "false",
        featured: req.body.featured === "true",
        discountPercentage: req.body.discountPercentage
          ? Number(req.body.discountPercentage)
          : undefined,
        discountDescription: req.body.discountDescription || "",
      };

      // Add image if uploaded
      if (req.files && req.files.image) {
        updateData.image = `/uploads/${req.files.image[0].filename}`;
      }

      // Handle multiple images if provided
      if (req.body.images) {
        try {
          const imagesData = JSON.parse(req.body.images);
          if (Array.isArray(imagesData)) {
            updateData.images = imagesData;
          }
        } catch (e) {
          console.log("No images data to update");
        }
      }

      // Handle gallery images from files
      if (req.files && req.files.images) {
        const galleryFiles = Array.isArray(req.files.images)
          ? req.files.images
          : [req.files.images];

        const galleryPaths = galleryFiles.map(
          (file) => `/uploads/${file.filename}`
        );
        
        // If there are existing images in the request body, combine them
        if (req.body.images) {
          try {
            const existingImages = JSON.parse(req.body.images);
            updateData.images = [...existingImages, ...galleryPaths];
          } catch (e) {
            updateData.images = galleryPaths;
          }
        } else {
          updateData.images = galleryPaths;
        }
      }

      console.log("Processed update data:", updateData);

      const card = await Card.findByIdAndUpdate(req.params.id, updateData, {
        new: true,
        runValidators: true,
      });
      if (!card) {
        return res.status(404).json({ error: "Card not found" });
      }
      res.json(card);
    } catch (err) {
      console.error("Error updating card:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
