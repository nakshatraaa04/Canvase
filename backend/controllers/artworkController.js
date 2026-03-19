const artwork = require("../models/Artwork");


// ➕ ADD ARTWORK
const handleAddArtworkController = async (req, res) => {
    try {

        const data = req.body;

        // Mandatory fields (based on your project)
        if (!data.title || !data.artist || !data.price) {
            return res.status(400).json({
                Message: "Title, Artist and Price are required",
                Success: false
            });
        }

        const artworkData = await artwork.insertOne(data);

        if (artworkData) {
            return res.status(200).json({
                Message: "Artwork added successfully",
                Success: true
            });
        }

    } catch (err) {
        return res.status(500).json({
            Message: err.message,
            Success: false
        });
    }
};



// 📋 GET ALL ARTWORKS
const handleArtworkListController = async (req, res) => {
    try {

        const artworkList = await artwork.find({});

        if (artworkList) {
            return res.status(200).json({
                Message: "Artworks fetched successfully",
                Success: true,
                ArtworkList: artworkList,
                TotalArtworks: artworkList.length
            });
        }

        return res.status(400).json({
            Message: "Artworks not found",
            Success: false
        });

    } catch (err) {
        return res.status(500).json({
            Message: err.message,
            Success: false
        });
    }
};


// 🔍 GET SINGLE ARTWORK
const handleFindArtworkController = async (req, res) => {
    try {

        const data = req.body;

        const art = await artwork.find({ _id: data.Id });

        if (art) {
            return res.status(200).json({
                Message: "Artwork details fetched successfully",
                Success: true,
                Artwork: art
            });
        }

        return res.status(400).json({
            Message: "Artwork not found",
            Success: false
        });

    } catch (err) {
        return res.status(500).json({
            Message: err.message,
            Success: false
        });
    }
};



// ✏️ UPDATE ARTWORK
const handleUpdateArtworkController = async (req, res) => {
    try {

        const data = req.body;

        const updateArtwork = await artwork.updateOne(
            { _id: data.Id },
            { $set: data }
        );

        if (updateArtwork) {
            return res.status(200).json({
                Message: "Artwork updated successfully",
                Success: true
            });
        }

        return res.status(400).json({
            Message: "Artwork not updated",
            Success: false
        });

    } catch (err) {
        return res.status(500).json({
            Message: err.message,
            Success: false
        });
    }
};



// 🔎 SEARCH ARTWORK (by title or artist)
const handleSearchArtworkController = async (req, res) => {
    try {

        const search = req.query.search;

        const artworks = await artwork.find({
            $or: [
                { title: { $regex: search, $options: "i" } },
                { artist: { $regex: search, $options: "i" } }
            ]
        });

        if (artworks.length > 0) {
            return res.status(200).json({
                Message: "Artworks found",
                Success: true,
                ArtworkList: artworks
            });
        }

        return res.status(404).json({
            Message: "No artworks found",
            Success: false
        });

    } catch (err) {
        return res.status(500).json({
            Message: err.message,
            Success: false
        });
    }
};



// 🎯 FILTER ARTWORK (category / status)
const handleFilterArtworkController = async (req, res) => {
    try {

        const { category, status } = req.query;

        let filter = {};

        if (category) {
            filter.category = { $regex: category, $options: "i" };
        }

        if (status) {
            filter.status = { $regex: status, $options: "i" };
        }

        const artworks = await artwork.find(filter);

        if (artworks.length > 0) {
            return res.status(200).json({
                Message: "Filtered artworks fetched successfully",
                Success: true,
                ArtworkList: artworks,
                TotalArtworks: artworks.length
            });
        }

        return res.status(404).json({
            Message: "No artworks found",
            Success: false
        });

    } catch (err) {
        return res.status(500).json({
            Message: err.message,
            Success: false
        });
    }
};



// ❌ DELETE ARTWORK
const handleDeleteArtworkController = async (req, res) => {
    try {

        const data = req.body;

        const deleteArtwork = await artwork.deleteOne({ _id: data.Id });

        if (deleteArtwork) {
            return res.status(200).json({
                Message: "Artwork deleted successfully",
                Success: true
            });
        }

        return res.status(400).json({
            Message: "Artwork not found",
            Success: false
        });

    } catch (err) {
        return res.status(500).json({
            Message: err.message,
            Success: false
        });
    }
};



// 🖼️ UPLOAD ARTWORK IMAGE
const handleUploadArtworkController = async (req, res) => {
    try {

        const { title, artist, description, price } = req.body;

        const file = req.file;

        const newArtwork = new artwork({
            title,
            artist,
            description,
            price,
            image: file.filename
        });

        await newArtwork.save();

        return res.status(200).json({
            Message: "Artwork uploaded successfully",
            Success: true,
            Artwork: newArtwork
        });

    } catch (err) {
        return res.status(500).json({
            Message: err.message,
            Success: false
        });
    }
};



// ⭐ RATE ARTWORK (NEW FEATURE)
const handleRateArtworkController = async (req, res) => {
    try {

        const { rating, userId } = req.body;

        const art = await artwork.findById(req.params.id);

        art.ratings.push({ userId, rating });

        const avg =
            art.ratings.reduce((a, b) => a + b.rating, 0) /
            art.ratings.length;

        art.averageRating = avg;

        await art.save();

        return res.status(200).json({
            Message: "Rating added",
            Success: true,
            Artwork: art
        });

    } catch (err) {
        return res.status(500).json({
            Message: err.message,
            Success: false
        });
    }
};




module.exports = {
    handleAddArtworkController,
    handleArtworkListController,
    handleFindArtworkController,
    handleUpdateArtworkController,
    handleSearchArtworkController,
    handleFilterArtworkController,
    handleDeleteArtworkController,
    handleUploadArtworkController,
    handleRateArtworkController
};