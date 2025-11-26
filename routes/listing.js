const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const { validateListing, isLogin, isOwner } = require('../middlewares.js');
const listings = require('../controllers/listing');
const Listing = require("../models/listing");
const multer = require('multer');
const storage = require('../cloudConfig.js').storage;
const upload = multer({ storage });
//const image = Listing;
// Index + Create
router.route("/")
    .get(wrapAsync(listings.index))
    .post(upload.single("image"), wrapAsync(listings.create));


// New Form
router.get("/new", isLogin, (req, res) => {
    res.render("listings/new.ejs");
});

// Show + Update + Delete
router.route("/:id")
    .get(wrapAsync(listings.show))
    .put(
        isLogin,
        isOwner,
        upload.single("image"),
        validateListing,
        wrapAsync(listings.update)
    )
    .delete (isLogin, isOwner, wrapAsync(listings.delete));

// Edit Form
router.get("/:id/edit", isLogin, isOwner, wrapAsync(listings.edit));

router.get("/category/:category", async (req, res) => {
    const { category } = req.params;
    const allListings = await Listing.find({ category });
    res.render("listings/index", { allListings, category: null });
});


module.exports = router;
