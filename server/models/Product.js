const mongoose = require('mongoose')
const Product = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true
    },
    price: {
        type: Number,
        trim: true
    },
    image: String
})

module.exports = mongoose.model('product', Product)