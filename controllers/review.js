const Review = require('../models/reviews');
const Listing = require('../models/listing');

module.exports.createReview = async (req, res) => {
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
};

module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash('success', 'Review Deleted!');
  res.redirect(`/listings/${id}`);
};

module.exports.redirectUrl = async (req, res) => {
  const listing = await Listing.findById(req.params.id).populate("reviews");
  res.render("listings/show.ejs", { list: listing });
};