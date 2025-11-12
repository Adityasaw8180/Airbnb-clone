const Joi = require("joi");

// Listing validation schema
module.exports.listingSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(""),
  image: Joi.object({
    filename: Joi.string().allow(""),
    url: Joi.string().uri().allow(""),
  }),
  price: Joi.number().min(0).required(),
  location: Joi.string().required(),
  country: Joi.string().required(),
});

// Review validation schema
module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    comment: Joi.string().allow(""),
    rating: Joi.number().min(1).max(5).required(),
  }).required(),
});
