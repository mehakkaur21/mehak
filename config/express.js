let config          = require('./env/development')
let express         = require('express')
let morgan          = require('morgan')
let compress        = require('compression')
let bodyParser      = require('body-parser')
let methodOverride  = require('method-override')

let session         = require('express-session')
let passport        = require('passport')
let passportLocal   = require('passport-local').Strategy

let User       = require('../app/models/users.server.model')

module.exports = function() {
    let app     = express()

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'))
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress())
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }))
    app.use(bodyParser.json())
    app.use(methodOverride())

    // Initialize express-session
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }))

    // Initialize passport 
    app.use(passport.initialize())
    app.use(passport.session())

    // Serialize and Deserialize User info
    passport.serializeUser(User.serializeUser())
    passport.deserializeUser(User.deserializeUser())

    // Set where to find views and view engine to ejs
    app.set('views', './app/views')
    app.set('view engine', 'ejs')

    // Tell express where to find static files
    app.use(express.static('./public'))

    // Calling express routes
    require('../app/routes/index.server.routes')(app)
    require('../app/routes/users.server.routes')(app)

    return app
}