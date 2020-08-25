  
const mongoose = require('mongoose')

const visitorSchema = mongoose.Schema({
    residentId : {
        type : String,
        required : true
    },
    visitorName : {
        type :  String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    phoneNumber : {
        type : Number,
        required : true
    },
    vehicleNumber : {
        type : Number,
    },
    flatNumber : {
        type : String
    },
    isPreapproved : {
        type : Boolean,
        default : false
    },
    checkInTime : {
        type : Number
    },
    checkOutTime : {
        type : Number
    }
})

// Add Visitor
guardSchema.statics.addVisitor = async (mobileNumber, password) => {
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