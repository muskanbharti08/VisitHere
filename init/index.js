let mongoose = require('mongoose');
let initData = require('./data');
let Listing = require("../models/listing");




async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/mp');
}
main().then(
    ()=>{console.log("success")}
).catch(
    ()=>{console.log("err")}
);


let initDb = async()=>{

    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data saved");
}

initDb();