const passport = require('passport')



module.exports = function(app) {
    let index = require('../controllers/index.server.controller')
    app.get('/', index.render) //Setup GET route '/' to render index page
}