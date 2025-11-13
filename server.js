//server.js
const express = require('express');
const app = express();

const PORT = 8080;
const ejs = require('ejs');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate);
const session = require('express-session');
const flash = require('connect-flash');

const Listing = require('./models/listing');
const Review = require('./models/reviews');
const wrapAsync = require('./utils/wrapAsync');
const ExpressError = require('./utils/ExpressError');
const {listingSchema,reviewSchema} = require('./schemaValidate');
const listings = require('./routes/listing');
const reviews = require('./routes/review');


// Middleware (only once)
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

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

//connect mongodb
async function main() {
    await mongoose.connect(MONGO_DB);
}

//express-session
const sessionOptions = {
    secret : "secretePass",
    resave : false,
    saveUninitialized:  true,
    cookie : {
        expires : Date.now() + 1000*60*60*24*7,
        maxAge : 1000*60*60*24*7,
        httpOnly : true
    },
};
app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// Routes
app.get("/", (req, res) => {
    res.redirect("/listings");
});

//Use listing routes
app.use('/listings',listings)

//Use review routes
app.use('/listings/:id/reviews',reviews)

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
