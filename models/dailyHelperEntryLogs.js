  
const mongoose = require('mongoose')

const dailyHelperEntryLogsSchema = mongoose.Schema({
    apartmentIds : [{
        apartmentId: String
    }],
    dailyHelperId : {
        type : String,
        required : true
    },
    checkInTime : {
        type : String,
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
    checkOutTime : {
        type : String,
        // required :  true
    },
})



const DailyHelperEntryLogs = mongoose.model('dailyHelperEntryLogs', dailyHelperEntryLogsSchema)

module.exports = DailyHelperEntryLogs