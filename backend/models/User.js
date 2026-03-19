const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["customer", "artist"],
    default: "customer"
  },
  bio: {
    type: String,
    default: ""
  },
  profilePic: {
    type: String,
    default: ""
  },
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artwork"
    }
  ]
});

// ✅ Export the model
module.exports = mongoose.model("User", userSchema);