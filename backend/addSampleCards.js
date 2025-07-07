const mongoose = require("mongoose");
const Card = require("./models/Card");

mongoose.connect(
  "mongodb+srv://abdultawabsamadzai:gfBiuGJLUKRubwIt@cluster0.ysv44j0.mongodb.net/Group-Tours"
);

const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  province: { type: String, required: true },
  price: { type: Number, required: true },
  duration: String,
  dates: [String],
  rating: Number,
  features: [String],
});

Card.insertMany([
  {
    title: "Card 1",
    description: "Description 1",
    image: "https://via.placeholder.com/300x200?text=Card+1",
  },
  {
    title: "Card 2",
    description: "Description 2",
    image: "https://via.placeholder.com/300x200?text=Card+2",
  },
])
  .then(() => {
    console.log("✅ Sample cards added");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error(err);
    mongoose.disconnect();
  });
