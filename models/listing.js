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
            set: (v) => v === "" ? "https://images.unsplash.com/photo-1614649024145-7f847b1c803f?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
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