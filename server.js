const express = require('express');
const app = express();

const PORT = 8080;
const ejs = require('ejs');
const mongoose = require('mongoose');
const Listing = require('./models/listing');
const path = require('path');

// Middleware (only once)
app.use(express.urlencoded({ extended: true }));

// View engine
app.set('view engine', "ejs");
app.set('views', path.join(__dirname, "views"));

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

// Index Route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render('listings/index.ejs', { allListings });
});

// New Route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

// Show Route
app.get("/listings/:id", async (req, res) => {
    const { id } = req.params;
    const list = await Listing.findById(id);
    res.render("listings/show.ejs", { list });
});

// Create Route (POST)
app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body.Listing);
    await newListing.save();
    console.log(newListing);
    res.redirect("/listings");   
});

// Server Start
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
