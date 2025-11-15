const express = require("express");
const router = express.Router({ mergeParams: true });   //Include route parameters from the parent route
const wrapAsync = require('../utils/wrapAsync');
const { isAuthor } = require('../middlewares.js');

const Listing = require('../models/listing');
const Review = require('../models/reviews');
const { isLogin, validateReviews } = require('../middlewares.js');

//redirect url handler
router.get("/", async (req, res) => {
  const listing = await Listing.findById(req.params.id).populate("reviews");
  res.render("listings/show.ejs", { list: listing });
});

//Post Review Route
router.post("/", isLogin, validateReviews, wrapAsync(async (req, res) => {
  const { id } = req.params;
  const list = await Listing.findById(id);
  console.log(req.body.review);
  const newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  list.reviews.push(newReview);
  await newReview.save();
  await list.save();
  req.flash('success', 'Review Created!');
  console.log(newReview);
  res.redirect(`/listings/${id}`);
}));

//Delete Review Route
router.delete("/:reviewId", isLogin, isAuthor, wrapAsync(async (req, res) => {
  const { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash('success', 'Review Deleted!');
  res.redirect(`/listings/${id}`);
}));

module.exports = router;