//server 
const express = require('express');
const app = express();
const PORT = 8080;
const ejs = require('ejs');
const mongoose = require('mongoose');

const MONGO_DB = "mongodb://127.0.0.1:27017/airbnb"

main().then(()=>{
    console.log('connected mongobd successfully');
}).catch((err)=>{
    console.log(`connection failed ${err}`);
});

async function main(){
    await mongoose.connect(MONGO_DB);
}

app.get("/",(req,res)=>{
    res.send("Home Page");
});

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});