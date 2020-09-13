  
const mongoose = require('mongoose')

const visitorEntryLogsSchema = mongoose.Schema({
    apartmentId : {
        type : String,
        required : true
    },
    visitorId : {
        type : String,
        required : true
    },
    checkInTime : {
        type : Date,
        required :  true
    },
    societyId : {
        type:  String,
        required: true
    },
    guardId : {
        type : String,
        required : true
    },
    deviceId : {
        type : String,
        required : true
    },
    status:{
        type: String,
        enum: ['Accepted', 'Rejected']
    }
})



const VisitorEntryLogs = mongoose.model('visitorEntryLogs', visitorEntryLogsSchema)

module.exports = VisitorEntryLogs