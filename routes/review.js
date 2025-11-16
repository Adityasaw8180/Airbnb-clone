const express = require("express");
const router = express.Router({ mergeParams: true });   //Include route parameters from the parent route
const wrapAsync = require('../utils/wrapAsync');
const { isLogin, validateReviews, isAuthor } = require('../middlewares.js');
const Reviews = require('../controllers/review');

router.route('/')
    .get(Reviews.redirectUrl)  //redirect url handler
    .post( isLogin, validateReviews, wrapAsync(Reviews.createReview));  //Post Review Create Route

//Delete Review Delete Route
router.delete("/:reviewId", isLogin, isAuthor, wrapAsync(Reviews.deleteReview));

module.exports = router;