const { listingSchema, reviewSchema } = require('./schemaValidate.js');
const ExpressError = require('./utils/ExpressError');

//vadate login 
module.exports.isLogin = (req,res,next)=>{
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/'); 
    }
   next();
}

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