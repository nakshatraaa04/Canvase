const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: String,
  artworks: Array,
  totalAmount: Number,
  status: {
    type: String,
    default: "Pending"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);