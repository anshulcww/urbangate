  
const mongoose = require('mongoose')
const validator = require('validator')

const societySchema = mongoose.Schema({
    societyName : {
        type :  String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    societyMobileNumber : {
        type : Number,
        required : true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({
                    error: 'invalid email address'
                })
            }
        }
    },
})

const Society = mongoose.model('society', societySchema)

module.exports = Society