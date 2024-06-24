const mongoose = require("mongoose");
const data = require("./data");
const Transaction = require("../models/transactions");

main()
.then(()=>{
    console.log("CONNECTED TO DB")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/expense-tracker');
}

const addData = async ()=>{
    await Transaction.deleteMany({});
    await Transaction.insertMany(data);
    console.log("DATA ADDED");
}

addData()