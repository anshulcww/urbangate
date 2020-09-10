  
const mongoose = require('mongoose')

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
        required : true
    }
})

const Resident = mongoose.model('resident', residentSchema)

module.exports = Resident