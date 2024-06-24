const mongoose = require("mongoose");
const { type } = require("../schema");

const transactionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    transactionType: {
        type: String,
        required: true,
        enum: ['income','expense']
    },
    date: {
        type: Date,
        default: Date.now()
    },
    amount: {
        type: Number,
        min: 1,
        required: true
    },
    tag: {
        type: String,
        required: true,
    },
})


const Transaction = mongoose.model('Transaction',transactionSchema);

module.exports = Transaction;