//reset all data in database
const mongoose = require('mongoose');
const initData = require('./data')
const Listing = require("../models/listing");
const Review = require("../models/reviews");
const User = require("../models/user");
const MONGO_DB = "mongodb://127.0.0.1:27017/airbnb"

main().then(() => {
    console.log('connected mongobd successfully');
}).catch((err) => {
    console.log(`connection failed ${err}`);
});

async function main() {
    await mongoose.connect(MONGO_DB);
}

const initDB = async ()=>{
    await Listing.deleteMany({});
   // await Review.deleteMany({});
    initData.data = initData.data.map((data)=>({
       ...data, owner : "69183fdebe54ede70095f21e"
    }));
    await Listing.insertMany(initData.data);
    //await User.deleteMany({});
    console.log('Data Initialized successfully')
}

initDB();