const User = require("../models/User");

// Add to wishlist
exports.addToWishlist = async (req, res) => {
  const user = await User.findById(req.params.userId);

  user.wishlist.push(req.body.artworkId);
  await user.save();

  res.json(user);
};

// Get wishlist
exports.getWishlist = async (req, res) => {
  const user = await User.findById(req.params.userId).populate("wishlist");
  res.json(user.wishlist);
};