  
const mongoose = require('mongoose')

const dailyHelperEntryLogsSchema = mongoose.Schema({
    appartmentIds : [{
        appartmentId: String
    }],
    dailyHelperId : {
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



const DailyHelperEntryLogs = mongoose.model('dailyHelperEntryLogs', dailyHelperEntryLogsSchema)

module.exports = DailyHelperEntryLogs