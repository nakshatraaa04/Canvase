const express = require("express");
const router = express.Router();
const {
  addToWishlist,
  getWishlist
} = require("../controllers/wishlistController");

router.post("/:userId", addToWishlist);
router.get("/:userId", getWishlist);

module.exports = router;