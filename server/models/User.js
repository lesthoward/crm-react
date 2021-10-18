const mongoose = require('mongoose')
const User = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        lowercase: true,
        trim: true,
        required: 'Coloque un nombre'
    }
})
module.exports = mongoose.model('User', User)