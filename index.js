const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ExpressError = require("./ExpressError");
const cors = require("cors");
const transactionRouter = require("./route/transaction");;
const cookiesParser = require("cookie-parser")
require("dotenv").config();

main()
.then(()=>{
    console.log("CONNECTED TO DB")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173'
}))


app.use(cookiesParser())

app.use("/transactions",transactionRouter)

app.all("*",(req,res,next)=>{
  next(new ExpressError(404,"PAGE NOT FOUND"))
})

app.use((err,req,res,next)=>{
  let {status = 500,message="SOME ERROR OCCURED"} = err
  res.send({
    status: status,
    message: message
  })
})
const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
  console.log("Server is listening to port : ",PORT);
})