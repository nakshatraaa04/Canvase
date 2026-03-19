const mongoose = require("mongoose");

const artworkSchema = new mongoose.Schema({
  title: String,
  artist: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  status: {
    type: String,
    default: "Available"
  },

  ratings: [
    {
      userId: String,
      rating: Number
    }
  ],

  averageRating: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Artwork", artworkSchema);