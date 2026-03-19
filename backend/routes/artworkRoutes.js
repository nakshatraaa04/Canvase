const express = require("express");
const upload = require("../middleware/upload");

const {
    handleAddArtworkController,
    handleArtworkListController,
    handleFindArtworkController,
    handleUpdateArtworkController,
    handleSearchArtworkController,
    handleFilterArtworkController,
    handleDeleteArtworkController,
    handleUploadArtworkController,
    handleRateArtworkController
} = require("../controllers/artworkController");

const router = express.Router();


router.post("/addArtwork", handleAddArtworkController);


router.get("/getArtworks", handleArtworkListController);


router.get("/findArtwork", handleFindArtworkController);

router.put("/updateArtwork", handleUpdateArtworkController);

router.get("/searchArtwork", handleSearchArtworkController);


router.get("/filterArtwork", handleFilterArtworkController);


router.delete("/deleteArtwork", handleDeleteArtworkController);


router.post("/uploadArtwork", upload.single("file"), handleUploadArtworkController);


router.post("/rateArtwork/:id", handleRateArtworkController);

module.exports = router;