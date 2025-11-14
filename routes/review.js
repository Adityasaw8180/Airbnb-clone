const express = require("express");
const router = express.Router({ mergeParams: true });   //Include route parameters from the parent route
const wrapAsync = require('../utils/wrapAsync');

const Listing = require('../models/listing');
const Review = require('../models/reviews');
const { isLogin , validateReviews} = require('../middlewares.js');


//Post Review Route
router.post("/",isLogin, validateReviews, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const list = await Listing.findById(id);
    const newReview = new Review(req.body.review);
    list.reviews.push(newReview);
    await newReview.save();
    await list.save();
    req.flash('success', 'Review Created!');
    console.log(newReview);
    res.redirect(`/listings/${id}`);
}));

//Delete Review Route
router.delete("/:reviewId",isLogin, wrapAsync(async (req, res) => {
  const { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash('success', 'Review Deleted!');
  res.redirect(`/listings/${id}`);
}));

module.exports = router;