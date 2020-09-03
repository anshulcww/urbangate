  
const mongoose = require('mongoose')

const residentSchema = mongoose.Schema({
    residentName : {
        type :  String,
        required : true
    },
    appartmentId : {
        type : String,
        required : true
    },
    residentMobileNumber : {
        type : Number,
        required : true
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