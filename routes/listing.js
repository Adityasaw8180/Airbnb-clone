const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const Listing = require('../models/listing');
const { validateListing, isLogin, isOwner } = require('../middlewares.js');
const e = require('connect-flash');
const listings = require('../controllers/listing');

// Index Route
router.get("/", wrapAsync(listings.index));

// New Route
router.get("/new", isLogin, (req, res) => {
    res.render("listings/new.ejs");
});

// Show Route
router.get("/:id", wrapAsync(listings.show));

// Create Route (POST)
router.post("/", isLogin, validateListing, wrapAsync(listings.create));

//Edit Route
router.get("/:id/edit", isLogin, isOwner, wrapAsync(listings.edit));

//Update Route
router.put("/:id", isLogin, isOwner, validateListing, wrapAsync(listings.update));

//Delete Route
router.delete("/:id", isLogin, isOwner, wrapAsync(listings.delete));

module.exports = router;