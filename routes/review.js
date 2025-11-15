const express = require("express");
const router = express.Router({ mergeParams: true });   //Include route parameters from the parent route
const wrapAsync = require('../utils/wrapAsync');
const { isAuthor } = require('../middlewares.js');
const { isLogin, validateReviews } = require('../middlewares.js');
const Reviews = require('../controllers/review');
//redirect url handler
router.get("/", Reviews.redirectUrl);

//Post Review Create Route
router.post("/", isLogin, validateReviews, wrapAsync(Reviews.createReview));

//Delete Review Delete Route
router.delete("/:reviewId", isLogin, isAuthor, wrapAsync(Reviews.deleteReview));

module.exports = router;