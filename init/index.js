// reset all data in database

require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");
const Review = require("../models/reviews");
const User = require("../models/user");

const CLOUD_DB = process.env.ATLASDB_URL;

// Connect DB first, then initialize data
main()
  .then(async () => {
    console.log("connected mongodb successfully");
    await initDB();
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(`connection failed ${err}`);
  });

async function main() {
  await mongoose.connect(CLOUD_DB);
}

const initDB = async () => {
  try {
    // delete old listings
    await Listing.deleteMany({});

    // optional
    // await Review.deleteMany({});
    // await User.deleteMany({});

    // add owner to all listings
    const updatedData = initData.data.map((data) => ({
      ...data,
      owner: "69183fdebe54ede70095f21e",
    }));

    // insert new data
    await Listing.insertMany(updatedData);

    console.log("Data Initialized successfully");
  } catch (err) {
    console.log("Error initializing DB:", err);
  }
};