//server.js
const express = require('express');
const app = express();

const PORT = 8080;
const ejs = require('ejs');
const mongoose = require('mongoose');
const Listing = require('./models/listing');
const Review = require('./models/reviews');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate);

const wrapAsync = require('./utils/wrapAsync');
const ExpressError = require('./utils/ExpressError');
const {listingSchema,reviewSchema} = require('./schemaValidate');
const listings = require('./routes/listing');
// Middleware (only once)
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));  // Serve static files from the 'public' directory
// View engine
app.set('view engine', "ejs");
app.set('views', path.join(__dirname, "views"));
app.use(methodOverride('_method'));
// Database connection
const MONGO_DB = "mongodb://127.0.0.1:27017/airbnb";

main().then(() => {
    console.log('mongoDB connected');
}).catch((err) => {
    console.log(`connection failed ${err}`);
});

async function main() {
    await mongoose.connect(MONGO_DB);
}

// Routes
app.get("/", (req, res) => {
    res.send("Home Page");
});

//Use listing routes
app.use('/listings',listings)


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
app.post("/listings/:id/reviews",validateReviews, wrapAsync(async (req, res) => {
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
app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async (req, res) => {
  const { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/listings/${id}`);
}));

//Express Error for all other routes

app.all(/.*/, (req, res, next) => {
    console.log(`404 Error: ${req.method} ${req.originalUrl}`);
    next(new ExpressError("Page Not Found", 404));
});


// Error Handling Middleware

app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong" } = err;
    console.log(err);
    res.status(status).render("error.ejs", { err });

});

// Server Start
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
