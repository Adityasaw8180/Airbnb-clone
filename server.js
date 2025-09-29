//server 
const express = require('express');
const app = express();

const PORT = 8080;
const ejs = require('ejs');
const mongoose = require('mongoose');
const Listing = require('./models/listing');
const path = require('path');
app.use(express.urlencoded({ extended: true }));

app.set('view engine', "ejs");
app.set('views', path.join(__dirname, "views"))
const MONGO_DB = "mongodb://127.0.0.1:27017/airbnb"

main().then(() => {
    console.log('mongoDB connected');
}).catch((err) => {
    console.log(`connection failed ${err}`);
});

async function main() {
    await mongoose.connect(MONGO_DB);
}

app.get("/", (req, res) => {
    res.send("Home Page");
});

//indexRoute
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render('listings/index.ejs', {allListings});
})

//CreateRoute
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});

//showRoute
app.get("/listings/:id",async (req,res)=>{
    const {id} = req.params;
    const list = await Listing.findById(id);
    res.render("listings/show.ejs", {list});
});

//postRoute
app.use(express.urlencoded({ extended: true }));  // add this at the top, after app=express()

app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body.Listing);
    await newListing.save();
    console.log(newListing);
    res.redirect("/listings");   // redirect after saving
});


// app.get('/testlisting', async (req, res) => {
//     const sampleList = {
//         title: "My new House",
//         description: 'I Buy new House',
//         image: "",
//         price: 200,
//         location: "Kolhapur",
//         country: "India",
//     }

//     await Listing.insertOne(sampleList);
//     console.log(sampleList);
//     res.send(sampleList);
// });

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});