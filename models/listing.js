const mongoose = require('mongoose');
const { required } = require('../schemaValidate');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        filename: {
            type: String,
            required: false,
        },
        url: {
            type: String,
            set: (v) => v === "" ? "https://images.unsplash.com/photo-1614649024145-7f847b1c803f?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
        },
        
    },
    price: {
        type: Number,
        default: 0,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Review',
        }
    ],

});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;