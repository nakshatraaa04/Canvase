const express = require("express");
const dbConnect = require("./config/db");
const userProfileRoute = require("./routes/userRoutes");
const artworkRoute = require("./routes/artworkRoutes");
const userRoute = require("./routes/authRoutes");
const wishlistRoute = require("./routes/wishlistRoutes");
const cors = require("cors");

dbConnect();

const port = 3000;

const app = express();

// ✅ CORS FIX (no app.options needed)
app.use(cors({
  origin: "http://localhost:5174",
  credentials: true
}));

// ✅ Middleware
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("Art Gallery Backend is Working");
});

// Routes
app.use("/user", userRoute);
app.use("/artwork", artworkRoute);
app.use("/wishlist", wishlistRoute);
app.use("/profile", userProfileRoute);
app.use("/uploads", express.static("uploads"));

// Server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});