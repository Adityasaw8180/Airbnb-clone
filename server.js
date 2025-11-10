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
const listingSchema = require('./schemaValidate');
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

//validate listing middleware
const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body.Listing);

   console.log(error);
    if (error) {
        throw new ExpressError("Invalid Listing Data", 400);    
    } else {
        next();
    }
};

// Index Route
app.get("/listings", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render('listings/index.ejs', { allListings });
}));

// New Route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

// Show Route
app.get("/listings/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const list = await Listing.findById(id);
    // console.log(list);
    res.render("listings/show.ejs", { list });
}));

// Create Route (POST)
app.post("/listings",validateListing, wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.Listing);
    await newListing.save();
    console.log(newListing);
    res.redirect("/listings");
}));

//Edit Route
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const list = await Listing.findById(id);
    res.render("listings/edit.ejs", { list });
}));

//Update Route
app.put("/listings/:id", validateListing,wrapAsync(async (req, res) => {
    if (!req.body.Listing) {
        throw new ExpressError("Invalid Listing Data", 400)
    };
    const { id } = req.params;
    const updatedListing = await Listing.findByIdAndUpdate(id, req.body.Listing, { new: true });
    console.log(updatedListing);
    res.redirect(`/listings/${id}`);
}));

//Delete Route
app.delete("/listings/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    let deletedList = await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));

//Post Review Route
app.post("/listings/:id/reviews", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const list = await Listing.findById(id);
    const newReview = new Review(req.body.review);
    list.reviews.push(newReview);
    await newReview.save();
    await list.save();
    console.log(newReview);
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
