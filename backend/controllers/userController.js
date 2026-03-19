const User = require("../models/User");
const Artwork = require("../models/Artwork");
const bcrypt = require("bcrypt");

// ================= REGISTER =================
exports.registerController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // check fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= LOGIN =================
exports.loginController = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // check role
    if (user.role !== role) {
      return res.status(400).json({ message: "Invalid role selected" });
    }

    // compare password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({
      message: "Login successful",
      user,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// 🎨 GET ARTIST PROFILE
exports.getArtistProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const artist = await User.findById(id);

    if (!artist || artist.role !== "artist") {
      return res.status(404).json({ message: "Artist not found" });
    }

    const artworks = await Artwork.find({ artistId: id });

    res.json({
      artist,
      artworks
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};