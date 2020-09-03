  
const mongoose = require('mongoose')

const visitorSchema = mongoose.Schema({
    visitorName : {
        type : String,
        // required : true
    },
    visitorAddress : {
        type : String,
        // required : true
    },
    visitorMobileNumber : {
        type : Number,
        required : true,
        unique : true
    },
    vehicleNo : {
        type : String,
    },
    visitorImageUrl : {
        type :  String
    },
})



const Visitor = mongoose.model('visitor', visitorSchema)

module.exports = Visitor