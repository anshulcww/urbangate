  
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
    flatNo : {
        type : String
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
        type : Number
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

// Add Visitor
visitorSchema.statics.addVisitor = async (mobileNumber, password) => {
    // const guard = await Guard.findOne({
    //     mobileNumber
    // })

    // if (!guard) {
    //     throw new Error('invalid credentials')
    // }

    return guard
}


const Visitor = mongoose.model('visitor', visitorSchema)

module.exports = Visitor