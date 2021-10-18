const mongoose = require('mongoose')
const Client = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true
    },
    lastname: {
        type: String,
        trim: true,
        lowercase: true
    },
    company: {
        type: String,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        trim:true,
        lowercase: true
    },
    phone: {
        type: String,
        trim: true
    }
})

module.exports = mongoose.model('client', Client)