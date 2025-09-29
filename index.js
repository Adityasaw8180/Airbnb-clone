//server 
const express = require('express');
const app = express();
const PORT = 8080;
const ejs = require('ejs');
const mongoose = require('mongoose');
const Listing = require('./models/listing');

const MONGO_DB = "mongodb://127.0.0.1:27017/airbnb"

main().then(() => {
    console.log('connected mongobd successfully');
}).catch((err) => {
    console.log(`connection failed ${err}`);
});

async function main() {
    await mongoose.connect(MONGO_DB);
}

app.get("/", (req, res) => {
    res.send("Home Page");
});

app.get('/testlisting', async (req, res) => {
    const sampleList = {
        title: "My new House",
        description: 'I Buy new House',
        image: "",
        price: 200,
        location: "Kolhapur",
        country: "India",
    }

    await Listing.insertOne(sampleList);
    console.log(sampleList);
    res.send(sampleList);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});