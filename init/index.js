const mongoose = require("mongoose");
const data = require("./data");
const Transaction = require("../models/transactions");
require("dotenv").config();

console.log(process.env.MONGO_URL);
main()
.then(()=>{
    console.log("CONNECTED TO DB")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(`${process.env.MONGO_URL}`);
}

const addData = async ()=>{
    await Transaction.deleteMany({});
    await Transaction.insertMany(data);
    console.log("DATA ADDED");
}

addData()