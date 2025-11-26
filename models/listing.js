const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./reviews.js');

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        url: {
            type: String,
            required: false,
            set: (v) =>
                v === ""
                    ? "https://images.unsplash.com/photo-1614649024145-7f847b1c803f?q=80&w=1074&auto=format&fit=crop"
                    : v,
        },
        filename: {
            type: String,
            required: false,
        }
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
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review',
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    category: {
        type: String,
        enum: ["mountains", "beach", "city", "village", "camp", "trending", "rooms", "premium"]
    },

});

listingSchema.post('findOneAndDelete', async (listing) => {
    if (listing) {
        await Review.deleteMany({
            _id: { $in: listing.reviews }
        });
    }
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
