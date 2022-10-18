const mongoose                  = require('mongoose')
const passportLocalMongoose     = require('passport-local-mongoose')
const Schema                    = mongoose.Schema

const UserSchema = new Schema
(
    {
        username: {
            type:       String,
            default:    '',
            trim:       true,
            required:   'Username is required'
        },
        email: {
            type:       String,
            default:    '',
            trim:       true,
            required:   'Email is required'
        },
        displayName: {
            type:       String,
            default:    '',
            trim:       true,
            required:   'Display Name is required'
        },
        created: {
            type:       Date,
            default:    Date.now
        },
        update: {
            type:       Date,
            default:    Date.now
        },
    },
    {
        collection:     'users'
    }
)

let options = ({ missingPasswordError: 'Wrong / Missing Password' })
UserSchema.plugin(passportLocalMongoose, options)

module.exports = mongoose.model("User", UserSchema)
