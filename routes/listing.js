const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const { validateListing, isLogin, isOwner } = require('../middlewares.js');
const listings = require('../controllers/listing');

//Index + Create
router.route("/")
    .get(wrapAsync(listings.index))                         
    .post(isLogin, validateListing, wrapAsync(listings.create));

//New
router.get("/new", isLogin, (req, res) => {
    res.render("listings/new.ejs");
});

//Show + Update + Delete
router.route("/:id")
    .get(wrapAsync(listings.show))                          
    .put(isLogin, isOwner, validateListing, wrapAsync(listings.update)) 
    .delete(isLogin, isOwner, wrapAsync(listings.delete)); 

//Edit 
router.get("/:id/edit", isLogin, isOwner, wrapAsync(listings.edit));

module.exports = router;
