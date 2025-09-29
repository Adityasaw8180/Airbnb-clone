const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
    },
    image: {
        filename: {
            type: String,
            require: true,
        },
        url: {
            type: String,
            set: (v) => v === "" ? "defaul link" : v,
        },
        
    },
    price: {
        type: Number,
        default: "0",
        require: true,
    },
    location: {
        type: String,
        require: true,
    },
    country: {
        type: String,
        require: true,
    },

});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;