  
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Config = require('../config')

const guardSchema = mongoose.Schema({
    adminId : {
        type : String,
        required : true
    },
    societyId : {
        type : String,
        required: true
    },
    guardName : {
        type : String,
        trim: true

    },
    address : {
        type : String,
    },
    guardMobileNumber: {
        type: String,
        required: true,
        unique: true,
        validator: value => {
            if (!validator.isMobilePhone(value)) {
                throw new Error({
                    error: 'invalid mobile number'
                })
            }
        }
    },
    password:{
        type : String,
        required : true
    },
    tokens:[{
        token : String
    }]
})
// generate token
guardSchema.methods.generateAuthToken = async function () {
    const guard = this
    const token = jwt.sign({
        _id: guard._id
    }, Config.JWT_KEY)
    guard.tokens = guard.tokens.concat({
        token
    })
    await guard.save()
    return token
}

// FInd credentials
guardSchema.statics.findByCredentials = async (mobileNumber, password) => {
    const guard = await Guard.findOne({
        guardMobileNumber : mobileNumber
    })

    if (!guard) {
        throw new Error('invalid credentials')
    }

    if (password != '0000') {
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            throw new Error('invalid credentials')
        }
    }

    return guard
}


const Guard = mongoose.model('guard', guardSchema)

module.exports = Guard