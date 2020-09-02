  
const mongoose = require('mongoose')

const visitorSchema = mongoose.Schema({
    appartmentId : {
        type : String,
        required : true
    },
    visitorAddress : {
        type : String,
        // required : true
    },
    visitorPhoneNumber : {
        type : Number,
        required : true
    },
    vehicleNo : {
        type : String,
    },
    contactPerson : {
        type : String
    },
    isPreapproved : {
        type : Boolean,
        default : false
    },
    checkInTime : {
        type : Date
    },
    checkOutTime : {
        type : Date
    },
    visitorImageUrl : {
        type :  String
    },
    status : {
        type: String,
        enum: ['accepted', 'declined'],
        // required: true
    },
    societyId : {
        type:  String,
        required: true
    },
    guardId : {
        type : String,
        required : true
    }
})



const Visitor = mongoose.model('visitor', visitorSchema)

module.exports = Visitor