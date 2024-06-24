const Joi = require('joi');

const schemaTransactionsValidaton = Joi.object({
    name: Joi.string().required(),
    transactionType: Joi.string().required(),
    amount: Joi.number().required(),
    tag: Joi.string().required(),
    date: Joi.string()
}) 

module.exports = schemaTransactionsValidaton