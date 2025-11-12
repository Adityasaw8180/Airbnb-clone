const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');
const { listingSchema } = require('../schemaValidate.js');
const Listing = require('../models/listing');

//validate listing middleware
const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body.Listing);
   //console.log(error);
    if (error) {
        throw new ExpressError("Invalid Listing Data", 400);    
    } else {
        next();
    }
};


// Index Route
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render('listings/index.ejs', { allListings });
}));

// New Route
router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
});

// Show Route
router.get("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const list = await Listing.findById(id).populate('reviews');
    // console.log(list);
    res.render("listings/show.ejs", { list });
}));

// Create Route (POST)
router.post("/",validateListing, wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.Listing);
    await newListing.save();
    console.log(newListing);
    res.redirect("/listings");
}));

//Edit Route
router.get("/:id/edit", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const list = await Listing.findById(id);
    res.render("listings/edit.ejs", { list });
}));

//Update Route
router.put("/:id", validateListing,wrapAsync(async (req, res) => {
    if (!req.body.Listing) {
        throw new ExpressError("Invalid Listing Data", 400)
    };
    const { id } = req.params;
    const updatedListing = await Listing.findByIdAndUpdate(id, req.body.Listing, { new: true });
    console.log(updatedListing);
    res.redirect(`/listings/${id}`);
}));

//Delete Route
router.delete("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    let deletedList = await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));

module.exports = router;