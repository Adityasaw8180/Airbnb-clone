const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const { validateListing, isLogin, isOwner } = require('../middlewares.js');
const listings = require('../controllers/listing');
const Listing = require("../models/listing");
const multer = require('multer');
const storage = require('../cloudConfig.js').storage;
const upload = multer({ storage });
const image = Listing;
// Index + Create
router.route("/")
    .get(wrapAsync(listings.index))
    .post(upload.single("image"), async (req, res) => {

        console.log("BODY:", req.body); // debugging

        const { path, filename } = req.file;

        const newListing = new Listing({
            title: req.body.Listing.title,
            description: req.body.Listing.description,
            price: req.body.Listing.price,
            location: req.body.Listing.location,
            country: req.body.Listing.country,
            image: {
                url: path,
                filename: filename
            },
            owner: req.user._id
        });

        await newListing.save();

        req.flash("success", "New Listing Created!");
        res.redirect(`/listings/${newListing._id}`);
    });


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

module.exports = router;
