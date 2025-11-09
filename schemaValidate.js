// schemaValidate.js

const Joi = require('joi');

const listingSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow(''),
    image: Joi.object({
        filename: Joi.string().required(),
        url: Joi.string().uri().allow(''),
    }),
    price: Joi.number().min(0).required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
});

module.exports = listingSchema;
