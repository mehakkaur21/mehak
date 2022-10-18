let userController = require('../controllers/users.server.controller')

module.exports = function(app) {
    // Chain routing with POST and GET
    // First POST to /users with .create method from userController
    // Then GET to /users with .list method from userController
    app.post('/users', userController.create).get('/users', userController.list)

    app.get('/login', userController.getLoginPage)
    app.get('/register', userController.getRegisterPage)

    app.post('/login', userController.loginUser)
    app.post('/register', userController.registerUser)

}