  
const mongoose = require('mongoose')

const residentSchema = mongoose.Schema({
    residentName : {
        type :  String,
        required : true
    },
    flatNo : {
        type : String,
        required : true
    },
    phoneNumber : {
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
    guardId : {
        type : String,
        required : true
    }
})

const Resident = mongoose.model('resident', residentSchema)

module.exports = Resident