const express = require("express");
const router = express.Router({ mergeParams: true });
const schemaTransactionsValidaton = require("../schema");
const wrapAsync = require("../wrapAsync");
const Transactions = require("../models/transactions");
const ExpressError = require("../ExpressError");

function validateTransaction(req, res, next) {
  console.log("validating");
  let result = schemaTransactionsValidaton.validate(req.body);
  if (result.error) {
    throw new ExpressError(400, result.error);
  } else {
    console.log("done");
    next();
  }
}

router.get(
  "/",
  wrapAsync(async (req, res) => {
    await Transactions.find({}).then((data) => {
      res.json(data);
    });
  })
);

router.get(
  "/income",
  wrapAsync(async (req, res) => {
    await Transactions.find({transactionType: "income"}).then((data) => {
      res.json(data);
    });
  })
);

router.get(
  "/expense",
  wrapAsync(async (req, res) => {
    await Transactions.find({transactionType: "expense"}).then((data) => {
      res.json(data);
    });
  })
)

router.post(
  "/",
  validateTransaction,
  wrapAsync(async (req, res, next) => {
    console.log("request recieved");
    let { name, transactionType, date, amount, tag } = req.body;
    let transaction = new Transactions({
      name: name,
      transactionType: transactionType,
      date: date,
      amount: amount,
      tag: tag,
    });

    await transaction
      .save()
      .then((data) => {
        res.json(data);
      })
      .catch((e) => {
        next(e);
      });
    console.log("request completed");
  })
);

module.exports = router;
