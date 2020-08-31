  
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Config = require('../config')


const adminSchema = mongoose.Schema({
    societyId : {
        type : String,
        required : true
    },
    adminName : {
        type :  String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    phoneNumber : {
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
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    tokens:[{
        token : String
    }]
})

adminSchema.pre('save', async function (next) {
    const admin = this
    if (admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 10)
    }
})

adminSchema.methods.generateAuthToken = async function () {
    const admin = this
    const token = jwt.sign({
        _id: admin._id
    }, Config.JWT_KEY)
    admin.tokens = admin.tokens.concat({
        token
    })
    await admin.save()
    return token
}

const Admin = mongoose.model('admin', adminSchema)
    
module.exports = Admin