const { listingSchema, reviewSchema } = require('./schemaValidate.js');
const ExpressError = require('./utils/ExpressError');
const Listing = require('./models/listing');
//vadate login 
module.exports.isLogin = (req,res,next)=>{
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/'); 
    }
   next();
}

module.exports.redirectedUrl = (req, res, next) => {
    //console.log(req.session.redirectUrl);
    if (req.session.redirectUrl) {
         res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};
//validate listing middleware
module.exports.validateListing = (req, res, next) => {
    if (!req.body.Listing) {
        throw new ExpressError("Invalid Listing Form Data", 400);
    }
    const { error } = listingSchema.validate(req.body.Listing);
    if (error) {
        throw new ExpressError(error.details.map(el => el.message).join(","), 400);
    } 
    next();
};

//validate review middleware
module.exports.validateReviews = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body.Review);
   //console.log(error);
    if (error) {
        throw new ExpressError("Invalid Review Data", 400);    
    } else {
        next();
    }
};

module.exports.isOwner = async (req, res, next) => {
    if (!req.user) {    
        req.flash("error", "You must be logged in!");
        return res.redirect("/");
    }
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing.owner.equals(req.user._id)) {
        req.flash("error", "You do not have permission!");
        return res.redirect(`/listings/${id}`);
    }

    next();
};
