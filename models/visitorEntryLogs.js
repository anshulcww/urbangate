  
const mongoose = require('mongoose')

const visitorEntryLogsSchema = mongoose.Schema({
    appartmentId : {
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
    }
})



const VisitorEntryLogs = mongoose.model('visitorEntryLogs', visitorEntryLogsSchema)

module.exports = VisitorEntryLogs