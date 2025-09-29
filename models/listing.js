const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title : {
        type:String,
        require : true,
    },
    description : String, 
    image : {
        type :String,
        set :(v)=> v==="" ? "defaul link" : v,
    },
    price : {
        type:Number,
        set :(v)=> v==="" ? 0 : v,
    },
    location: String,
    country : String,
    
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;