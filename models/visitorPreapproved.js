  
const mongoose = require('mongoose')

const VisitorPreApproved = mongoose.Schema({
    appartmentId : {
        type : String,
        required : true
    },
    visitorId : {
        type : String,
        required : true
    },
    preApprovedDate : {
        type : String,
        required :  true
    },
    societyId : {
        type:  String,
        required: true
    },
    residentId : {
        type : String,
        required :  true
    }
})



const VisitorPreApproved = mongoose.model('visitorPreApproved', VisitorPreApprovedSchema)

module.exports = VisitorPreApproved