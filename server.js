process.env.NODE_ENV    = process.env.NODE_ENV || 'development' // Set environment variable 'NODE_ENV' to 'development'

// Initialize mongoose and express
let configMongoose      = require('./config/mongoose')
let express             = require('./config/express');

// Call exported modules to start express and mongoose respectively
let app                 = express()
let db                  = configMongoose()


let HOST = '0.0.0.0'
let PORT = 3001

app.listen(PORT); 

console.log(`Server running at http://${HOST}:${PORT}/`); 
module.exports = app; 
