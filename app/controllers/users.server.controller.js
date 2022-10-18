const mongoose  = require('../../config/mongoose')
const passport  = require('passport')

const User      = require('../models/users.server.model')

// Create function to create dummy user in MongoDB
exports.create = async (req, res, next) => {
    // Creating dummy user is json format
    let user = new User({
        firstname: 'Bob',
        lastname: 'Moose',
        email: 'smohiud6@my.centennialcollege.ca',
        username: 'Bob',
        password: 'Moose'
    })

    // Try / Catch block to try and save user to database (MongoDB)
    try {
        user = await user.save()
        console.log('yes create')
        res.status(200).json(user)
    } catch (error) {
        console.log('no')
        return next(error)
    }
}

// List function to list all users in the database
exports.list = async (req, res, next) => {
    await User.find({}, (err, users) => {
        if (err) {
            return next(err)
        } else {
            console.log('yes list')
            res.status(200).json(users)
        }
    })
}

// Render login page 
exports.getLoginPage = (req, res, next) => {
    if (!req.user) {
        res.render('users/login', {
            title: 'Login',
            // alert: 'User Does Not Exist',
            displayName: req.user ? req.user.displayName : ''
        })
    } else {
        res.redirect('/')
    }
}

// Process Login of User
exports.loginUser = async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err)
        }

        if (!user) {
            console.log('Authentication Error')
            res.redirect('/login')
        }

        req.login(user, (err) => {
            if (err) {
                return next(Err)
            }
            res.redirect('/')
        })
    })(req, res, next)
}

// Render Registration page
exports.getRegisterPage = (req, res, next) => {
    if (!req.user) {
        res.render('users/register', {
            title: 'Register',
            displayName: req.user ? req.user.displayName : '',
            user: req.user,
            req: req
        })
    } else {
        res.redirect('users/register', { user: req.user })
    }
}

// Process User Registration
exports.registerUser = async (req, res, next) => {
    let newUser = new User({
        username: req.body.username,
        // password: req.body.password,
        email: req.body.email,
        displayName: req.body.displayName
    })

    User.register(newUser, req.body.password, (err) => {
        if (err) {
            console.log('Error: Inserting New User')

            if (err.name == "UserExistsError") {
                console.log('User Already Exists')
            }

            res.render('users/register', {
                title: 'Register',
                displayName: req.user ? req.user.displayName : ''
            })
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/')
            })
        }
    })
}

exports.logout = (req, res, next) => {
    req.logout()
    req.redirect('/')
}