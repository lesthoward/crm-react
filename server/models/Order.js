const mongoose = require('mongoose')
const Order = new mongoose.Schema({
    clientID: {
        type: mongoose.Types.ObjectId,
        ref: 'client'
    },
    order: [{
        productID: {
            type: mongoose.Types.ObjectId,
            ref: 'product'
        },
        quantity: Number
    }],
    total: Number
})

module.exports = mongoose.model('order', Order)