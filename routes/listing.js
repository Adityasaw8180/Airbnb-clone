const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const Listing = require('../models/listing');
const { validateListing, isLogin } = require('../middlewares.js');
const e = require('connect-flash');


// Index Route
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render('listings/index.ejs', { allListings });
}));

// New Route
router.get("/new",isLogin, (req, res) => {
    res.render("listings/new.ejs");
});

// Show Route
router.get("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const list = await Listing.findById(id).populate('reviews').populate('owner');
    if(!list){
        req.flash('error', 'listing does not exist!');
        return res.redirect('/listings');
    }
    console.log(list);
    res.render("listings/show.ejs", { list });
}));

// Create Route (POST)
router.post("/", validateListing, wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.Listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash('success', 'Created a new listing!');
    console.log(newListing);
    res.redirect("/listings");
}));

//Edit Route
router.get("/:id/edit",isLogin, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const list = await Listing.findById(id);
    if(!list){
        req.flash('error', 'listing does not exist!');
        return res.redirect('/listings');
    }
    res.render("listings/edit.ejs", { list });
}));

//Update Route
router.put("/:id",isLogin, validateListing, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const updatedListing = await Listing.findByIdAndUpdate(id, req.body.Listing, { new: true });
    req.flash('success', 'Updated listing!');
    console.log(updatedListing);
    res.redirect(`/listings/${id}`);
}));

//Delete Route
router.delete("/:id", isLogin,wrapAsync(async (req, res) => {
    const { id } = req.params;
    let deletedList = await Listing.findByIdAndDelete(id);
    req.flash('success', 'listing Deleted!');
    res.redirect("/listings");
}));

module.exports = router;