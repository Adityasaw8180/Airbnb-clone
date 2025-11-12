const express = require("express");
const router = express.Router({ mergeParams: true });   //Include route parameters from the parent route
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');
const { reviewSchema } = require('../schemaValidate.js');
const Listing = require('../models/listing');
const Review = require('../models/reviews');

//validate review middleware
const validateReviews = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body.Review);
   //console.log(error);
    if (error) {
        throw new ExpressError("Invalid Review Data", 400);    
    } else {
        next();
    }
};

//Post Review Route
router.post("/",validateReviews, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const list = await Listing.findById(id);
    const newReview = new Review(req.body.review);
    list.reviews.push(newReview);
    await newReview.save();
    await list.save();
    console.log(newReview);
    res.redirect(`/listings/${id}`);
}));

//Delete Review Route
router.delete("/:reviewId", wrapAsync(async (req, res) => {
  const { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/listings/${id}`);
}));

module.exports = router;