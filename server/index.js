const express = require('express')
const app = express()
const port = process.env.PORT || 8000
const mongoose = require('mongoose')
const cors = require('cors')
// DATABASE CONNECTION
if(process.env.NODE_ENV) {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connection has been established successfully'))
    .catch((error) => console.log('Error to connect database', error))    
} else {
    mongoose.connect('mongodb://localhost/restapi')
    .then(() => console.log('Connection has been established successfully'))
    .catch((error) => console.log('Error to connect database', error))
}


// MIDDLEWARES
let corsURL
if(process.env.NODE_ENV) {
    corsURL = process.env.CORS_URLS
} else {
    corsURL = ['http://localhost:3000']

}
const corsOption = {
    origin: function (origin, callback) {
        console.log(origin)
        if(corsURL.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Unauthorized CORS'))
        }
    }
}
app.use(cors(corsOption))
app.use(express.static('uploads'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// ROUTES
app.use('/', require('./routes/client.routes'))
app.use('/', require('./routes/product.routes'))
app.use('/', require('./routes/order.routes'))
app.use('/', require('./routes/auth.routes'))

app.listen(port, () => {
    console.log('Server on port', port);
})