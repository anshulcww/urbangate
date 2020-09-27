  
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Config = require('../config')

const residentSchema = mongoose.Schema({
    residentName : {
        type :  String,
        required : true
    },
    apartmentId : {
        type : String,
        required : true
    },
    residentMobileNumber : {
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
    familyMembers : [{
        memberName: String,
        relation: String,
        phoneNumber: Number,
        
    }],
    deviceIds : [String],
    societyId : {
        type : String,
        required : true
    },
    adminId : {
        type : String,
    },
    tokens:[{
        token : String
    }],
    
})

residentSchema.methods.generateAuthToken = async function () {
    const resident = this
    const token = jwt.sign({
        _id: resident._id
    }, Config.JWT_KEY)
    resident.tokens = resident.tokens.concat({
        token
    })
    await resident.save()
    return token
}

// FInd credentials
residentSchema.statics.findByCredentials = async (mobileNumber) => {
    const resident = await Resident.findOne({
        residentMobileNumber : mobileNumber
    })

    if (!resident) {
        throw new Error('invalid credentials')
    }

    // if (password != '0000') {
    //     const isPasswordCorrect = await bcrypt.compare(password, user.password)
    //     if (!isPasswordCorrect) {
    //         throw new Error('invalid credentials')
    //     }
    // }

    return resident
}

const Resident = mongoose.model('resident', residentSchema)

module.exports = Resident