  
const mongoose = require('mongoose')

const dailyHelperSchema = mongoose.Schema({
    helperName : {
        type :  String,
        required : true
    },
    appartmentIds : [{
        appartmentId: String
    }],
    helperMobileNumber : {
        type : Number,
        required : true
    },
    societyId : {
        type : String,
        required : true
    },
    adminId : {
        type : String,
        required : true
    }
})

const DailyHelper = mongoose.model('dailyHelper', dailyHelperSchema)

module.exports = DailyHelper