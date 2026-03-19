const express = require("express");
const router = express.Router(); 


const { 
  registerController, 
  loginController, 
  getArtistProfile 
} = require("../controllers/userController");


router.post("/register", registerController);
router.post("/login", loginController);   
router.get("/artist/:id", getArtistProfile);

module.exports = router;