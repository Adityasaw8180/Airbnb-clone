//server.js
const express = require('express');
const app = express();

if(process.env.NODE_ENV !== 'production'){
   require('dotenv').config();
}

const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate);
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('./models/user');
const ExpressError = require('./utils/ExpressError');
const listingsRoute = require('./routes/listing');
const reviewsRoute = require('./routes/review');
const userRoute = require('./routes/user');


// Middleware (only once)
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('view engine', "ejs");
app.set('views', path.join(__dirname, "views"));
app.use(methodOverride('_method'));

// Database connection
const MONGO_DB = "mongodb://127.0.0.1:27017/airbnb";

//function to connect to mongoDB
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
    secret:  process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    },
};

//use session and flash
app.use(session(sessionOptions));
app.use(flash());

//passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash middleware
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
});

//Use user routes
app.use("/", userRoute);

//Use listing routes
app.use('/listings', listingsRoute)

//Use review routes
app.use('/listings/:id/reviews', reviewsRoute)

//Handle Chrome DevTools request BEFORE 404
app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => {
  res.status(204).end();  
});

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

const PORT = process.env.PORT || 8080;

// Server Start
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
