  
const mongoose = require('mongoose')

const dailyhelperSchema = mongoose.Schema({
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

const Dailyhelper = mongoose.model('dailyhelper', dailyhelperSchema)

module.exports = Dailyhelper